import React from 'react';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from '../components/router';

const App = () => {
  const initialState = {
    currentPage: 0,
    isDealing: false,
    user: { bookings: [] }
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'moveScroll':
        return {
          ...state,
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