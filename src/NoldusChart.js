import React, { useMemo } from "react";
import { DataViewerChart } from "@insync-stageplayer/ui-components";


const NoldusChart = (props) => {
  const { time, visible, onDrag, onStopSelect } = props;

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

  const handleDrag = (e) => {
    onDrag({
      ...e,
      time: e.origin.from + (e.origin.length / 2) + e.delta,
    })
  };

  const handleStopSelect = (e) => {
    console.log(e);
    onStopSelect({
      ...e,
      time: e.selection.from + e.selection.length / 2,
      visible: e.selection.length
    })
  }

  const tickFormatter = (v) => {
    return `${v / 1000} s`;
  };

  return (
      <DataViewerChart 
        {...props} 
        range={range} 
        viewport={viewport} 
        onDrag={handleDrag}
        onStopSelect={handleStopSelect}
        xScale={{
          tickFormatter,
        }}
      />
  ) 
};

export default NoldusChart;