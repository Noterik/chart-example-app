import React, { useCallback, useReducer } from 'react';
import NoldusChart from "./NoldusChart";
import { ThemeProvider } from "styled-components";
import { Steps, themes } from "@insync-stageplayer/ui-components"; 
import exampleData from "./exampleData.json";

import './App.css';

/**
 * actionTypes for reducer
 */
const actionTypes = {
  SET_TIME: "SET_TIME",
  ADD_ZOOMSTEP: "ADD_ZOOMSTEP",
  SET_ACTIVE_ZOOMSTEP: "SET_ACTIVE_ZOOMSTEP"
};

/**
 * Action creators
 */
const actions = {
  setTime: (e) => ({
    type: actionTypes.SET_TIME,
    payload: e
  }),
  addZoomStep: (e) => ({
    type: actionTypes.ADD_ZOOMSTEP,
    payload: e
  }),
  setActiveZoomStep: (index) => ({
    type: actionTypes.SET_ACTIVE_ZOOMSTEP,
    payload: index
  })
}

/**
 * Reducer that handles actions, and returns a new state every time. 
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state, action) => {
  switch(action.type) {
    case actionTypes.SET_TIME: 
      return {
        ...state,
        time: action.payload.time
      }
    case actionTypes.ADD_ZOOMSTEP:
      const newSteps = [
        ...state.zoomSteps.slice(0, state.activeStep + 1),
        action.payload.selection.length,
      ];
      return {
        ...state,
        time: action.payload.time,
        zoomSteps: newSteps,
        activeStep: newSteps.length - 1
      }
    case actionTypes.SET_ACTIVE_ZOOMSTEP:
      return {
        ...state,
        activeStep: action.payload
      }
    default: return state;
  }
}

function App() {
  /**
   * This is basically like a mini redux store that you can scope to your current component.
   * Better to use if you have multiple state variables like in this example. For more info, see here:
   * 
   * https://reactjs.org/docs/hooks-reference.html#usereducer
   * 
   * If we did not use a reducer, and took care of state updates in the callbacks, we would have to recreate 
   * callbacks on every state change which might cause extra rerenders (thus affecting performance negatively).
   */
  const [state, dispatch] = useReducer(reducer, {
    time: 0,
    /**
     * The active step of the current zoomSteps, zoomSteps[activeStep] is the current "visible" value of the chart.
     */
    activeStep: 0,
    /**
     * This represents the "zooms" available on the chart.
     */
    zoomSteps: [40000, 20000]
  });

  /**
   * Callbacks created with useCallback are memoized, and only recreated if one of the variables inside 
   * the dependencies array changed. This callback will never have to be recreated because we are using useReducer.
   */
  const handleDrag = useCallback((e) => {
    dispatch(actions.setTime(e));
  }, []);

  const handleStopSelect = useCallback((e) => {
    dispatch(actions.addZoomStep(e));
  }, []);

  const handleStepsChange = useCallback((index) => {
    dispatch(actions.setActiveZoomStep(index));
  }, []);

  return (
    /**
     * Themeprovider is neccesary for styling the chart.
     */
    <ThemeProvider theme={themes.light}>
      <div className="App">
        <header className="App-header">
          <Steps activeStep={state.activeStep} onChange={handleStepsChange}>
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
              onStopSelect={handleStopSelect}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
