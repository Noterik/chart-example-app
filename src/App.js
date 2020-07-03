import React, { useState } from 'react';
import NoldusChart from "./NoldusChart";
import { ThemeProvider } from "styled-components";
import { Steps, themes } from "@insync-stageplayer/ui-components"; 
import exampleData from "./exampleData.json";

import './App.css';

function App() {
  const [state, setState] = useState({
    time: 0,
    activeStep: 0,
    zoomSteps: [40000, 20000],
  });

  const handleDrag = (e) => {
    setState({ ...state, time: e.time });
  };

  const handleStartSelect = (e) => {
    console.log("handleStartSelect = ", e);
  }

  const handleStopSelect = (e) => {
    console.log("handleStopSelect =", e);
    const newSteps = [
      ...state.zoomSteps.slice(0, state.activeStep + 1),
      e.selection.length,
    ];
    setState({ 
      ...state,
      time: e.time, 
      zoomSteps: newSteps,
      activeStep: newSteps.length - 1
    });
  };

  return (
    <ThemeProvider theme={themes.light}>
      <div className="App">
        <header className="App-header">
          <Steps activeStep={state.activeStep} onChange={(activeStep) => setState({ ...state, activeStep })}>
            {
              state.zoomSteps.map((step, index) => (
                <span key={index}>
                  {step.toFixed(2)}
                </span>
              ))
            }
          </Steps>
        </header>
        <main>
          <div className="chart-container">
            <NoldusChart
              lines={exampleData.metadata}
              linesData={exampleData.data}
              time={state.time}
              visible={state.zoomSteps[state.activeStep]}
              onDrag={handleDrag}
              onStartSelect={handleStartSelect}
              onStopSelect={handleStopSelect}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
