import React, { useState } from 'react';
import NoldusChart from "./NoldusChart";
import { ThemeProvider } from "styled-components";
import { Steps, themes } from "@insync-stageplayer/ui-components"; 
import * as exampleData from "./exampleData";

import './App.css';

function App() {
  const [state, setState] = useState({
    time: 0,
    activeStep: 0,
    zoomSteps: [40, 20],
  });

  const handleDrag = (e) => {
    setState({ ...state, time: e.time });
  };

  const handleStopSelect = (e) => {
    const newSteps = [
      ...state.zoomSteps.slice(0, state.activeStep + 1),
      e.selection.length,
    ];
    setState({ 
      ...state, 
      zoomSteps: newSteps,
      activeStep: newSteps.length - 1
    });
  };

  return (
    <ThemeProvider theme={themes.light}>
      <div className="App">
        <header className="App-header">
          <Steps activeStep={state.activeStep}>
            {
              state.zoomSteps.map((step, index) => (
                <span onClick={() => setState({ ...state, activeStep: index })}>
                  {step.toFixed(2)}
                </span>
              ))
            }
          </Steps>
        </header>
        <main>
          <div className="chart-container">
            <NoldusChart
              lines={exampleData.lines}
              linesData={exampleData.linesData}
              //events={exampleData.events}
              //eventLabels={exampleData.eventLabels}
              time={state.time}
              visible={state.zoomSteps[state.activeStep]}
              onDrag={handleDrag}
              onStopSelect={handleStopSelect}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
