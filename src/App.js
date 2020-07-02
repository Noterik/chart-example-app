import React from 'react';
import { ThemeProvider } from "styled-components";
import { DataViewerChart, themes } from "@insync-stageplayer/ui-components";
import * as exampleData from "./exampleData";

import './App.css';

function App() {
  console.log("themes = ", themes);
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={themes.dark}>
          <div className="chart-container">
            <DataViewerChart
              className="chart"
              lines={exampleData.lines}
              linesData={exampleData.linesData}
              viewport={{
                from: 0,
                length: 40
              }}
              range={{
                from: 0,
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
