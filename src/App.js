import React, { useState, useCallback, handleDrag } from 'react';
import NoldusChart from "./NoldusChart";
import * as exampleData from "./exampleData";

import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [visible, setVisible] = useState(5);

  const handleDrag = (e) => {
    setTime(e.time);
  };

  const handleStopSelect = (e) => {
    setTime(e.time);
    setVisible(e.visible);
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="chart-container">
            <NoldusChart
              lines={exampleData.lines}
              linesData={exampleData.linesData}
              time={time}
              visible={visible}
              onDrag={handleDrag}
              onStopSelect={handleStopSelect}
            />
          </div>
      </header>
    </div>
  );
}

export default App;
