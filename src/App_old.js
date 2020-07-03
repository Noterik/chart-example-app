import React, { useState, useCallback } from 'react';
import { ThemeProvider } from "styled-components";
import { DataViewerChart, themes } from "@insync-stageplayer/ui-components";
import * as exampleData from "./exampleData";

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    from: 100,
    length: 50
  });

  const handleDrag = useCallback((e) => {
    console.log("handleDrag =", e);
    const time = e.origin.from + (e.origin.length / 2) + e.delta;
    console.log("time = ", time);
    setViewport(e.viewport);
  }, []);

  const handleSelect = useCallback((e) => {
    console.log("handleSelect = ", e);
    setViewport(e.selection);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={themes.light}>
          <div className="chart-container">
            <DataViewerChart
              className="chart"
              lines={exampleData.lines}
              linesData={exampleData.linesData}
              viewport={viewport}
              onStopSelect={handleSelect}
              onDrag={handleDrag}
              range={{
                from: -20,
                length: 150
              }}
            />
          </div>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
