import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from './router';
const Componnent = () => {
  const [{counter}, dispatch] = useStateValue();

  const updateCounter = () => {
    const newCounter = counter;
    dispatch({ type: 'updateTime',counter: newCounter + 1 });
  }

  return (
    <button onClick={ () => updateCounter() } >{ counter }</button>
  );
}

const App = () => {
  const initialState = {
    counter: 0
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          counter: action.counter
        };
        case 'updateTime':
          return {
            ...state,
            counter: action.counter
          };
      default:
        return state;
    }
  };
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router></Router>
    </StateProvider>
  );
}

export default App;