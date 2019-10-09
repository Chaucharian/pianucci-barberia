import React from 'react';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from '../components/router';
import * as actionTypes from '../actions/types'

const App = () => {
  const initialState = {
    currentPage: 0,
    isDealing: false,
    user: { bookings: [] }
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case actionTypes.CREATE_APPOINTMENT:
            return {
                ...state,
                isDealing: true,
            };
        case actionTypes.SHOW_BOOKING_HANDLER:
            return {
                ...state,
                isDealing: true,
            };
        case actionTypes.HIDE_BOOKING_HANDLER:
            return {
                ...state,
                isDealing: false,
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