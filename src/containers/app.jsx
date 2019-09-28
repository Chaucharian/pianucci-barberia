import React from 'react';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from './router';

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