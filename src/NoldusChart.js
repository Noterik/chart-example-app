import React, { useMemo, useCallback, useRef } from "react";
import { DataViewerChart } from "@insync-stageplayer/ui-components";
import styled, { keyframes } from "styled-components";
import { PopoutTargetContext } from "@insync-stageplayer/ui-components";
import ChartSlider from "@insync-stageplayer/ui-components/lib/Chart/ChartSlider";
import ChartIndicator from "@insync-stageplayer/ui-components/lib/DataViewerChart/ChartIndicator";

import "typeface-lato";

const CustomChartIndicator = styled(ChartIndicator)`
  background-color: purple;
`;

const pulse = () => keyframes`
    0% {
      background-color: rgba(0, 0, 255, 0.5);
    }
    50% {
      background-color: rgba(0, 0, 255, 0.8);

    }
    100% {
      background-color: rgba(0, 0, 255, 0.5);
    }
`;

const CustomChartSlider = styled(ChartSlider)`
  border-color: blue;
  background-color: rgba(0, 0, 0, 0.1);
  :hover {
    cursor: grab;
    animation: ${pulse} 1s infinite;
  }
`;

/**
 * # CUSTOM RENDERERS
 * 
 * These are custom renderers, used to customize aspects of the chart. It's better to keep
 * these out-of-component to prevent unnesecary rerenders.l 
 */

/**
 * Custom renderer for the indicator, this is an overlay of the chart, indicating the current time.
 * The indicator is rendered in the middle of the chart. 
 * Is given an height (which is the height of the yScale of the chart).
 * @param {{ height: number }} props 
 */
const renderIndicator = (props) => <CustomChartIndicator {...props} />;

/**
 * Custom renderer for the slider. The slider is an overlay of the chart, overlaying the xScale,
 * can be used to drag the chart. 
 */
const renderSlider = (props) => <CustomChartSlider {...props} />;

/**
 * Custom tooltip content renderer. The tooltip itself (the box with the arrow) can also be changed through renderTooltip,
 * although this is a little more complex.
 * @param {*} props 
 */
const renderTooltipContent = (props) => {
  console.log("props = ", props);

  // The line metadata = 
  const lineMetadata = props.lines[props.point.lineIndex];

  // The current point value =
  const pointValue = props.datasets[props.point.lineIndex].data[props.point.index];
  console.log("pointValue = ", pointValue);

  return (
    <div>
      <div>LINE = { JSON.stringify(lineMetadata) }</div>
      <div>VALUE = { JSON.stringify(pointValue) }</div>
    </div>
  );
};

const tickFormatter = (v) => {
  return `${v / 1000} s`;
};

const xScaleProps = {
  showGridLines: true,
  fontSize: 20,
  show: true,
  tickFormatter,
  gridLinesDash: [5, 15],
};

const yScaleProps = {
  fontSize: 15,
  showGridLines: true,
  gridLinesDash: [5, 15],
  stepSize: 0.2
};

const formatTooltipX = ({ val }) => {
  return tickFormatter(val);
};

const formatTooltipY = ({ val }) => ({ val }) => {
  return val.toFixed(5);
};

/**
 * END CUSTOM RENDERERS
 */

const NoldusChart = (props) => {
  const { time, visible, onDrag, onStopSelect, lines: linesProp } = props;
  const popoutTarget = useRef(document.body);

  const rangeFrom = useMemo(() => {
    return (Math.floor(time / visible) - 1) * visible;
  }  , [time, visible]);

  const range = useMemo(() => {
    return {
      from: rangeFrom,
      length: visible * 3,
    }
  }, [rangeFrom, visible]);

  const viewport = useMemo(() => {
    return {
      from: time - visible / 2,
      length: visible
    };
  }, [time, visible]);

  const handleDrag = useCallback((e) => {
    onDrag({
      ...e,
      time: e.origin.from + (e.origin.length / 2) + e.delta,
    })
  }, [onDrag]);

  const handleStopSelect = useCallback((e) => {
    onStopSelect({
      ...e,
      time: e.selection.from + e.selection.length / 2,
      visible: e.selection.length
    })
  }, [onStopSelect]);

  /**
   * TODO:
   * This is not production ready code, see what fits your usecase.
   */
  const lines = useMemo(() => {
    if(visible < 2000) {
      return linesProp.map(l => ({
        ...l,
        pointRadius: 2
      }))
    }
    return linesProp;
  }, [linesProp, visible])

  return (
    <PopoutTargetContext.Provider value={popoutTarget}>
      <DataViewerChart 
        {...props} 
        range={range} 
        lines={lines}
        viewport={viewport} 
        onDrag={handleDrag}
        onStopSelect={handleStopSelect}
        defaultFontFamily="'Lato', serif"
        renderIndicator={renderIndicator}
        renderSlider={renderSlider}
        formatTooltipX={formatTooltipX}
        formatTooltipY={formatTooltipY}
        renderTooltipContent={renderTooltipContent}
        xScale={xScaleProps}
        yScale={yScaleProps}
      />
    </PopoutTargetContext.Provider>
  ) 
};

export default NoldusChart;