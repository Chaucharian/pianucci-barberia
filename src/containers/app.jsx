import React from 'react';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from '../components/router';
import * as actionTypes from '../actions/types'
import { enviroment } from '../enviroment';

const App = () => {
  // sessionStorage.setItem('userSession', { bookings: [] });

  const initialState = {
    currentPage: 0,
    isDealing: false,
    showBookingSection: false,
    goToBookingSection: false,
    user: { id: '', bookings: [] },
    activeBookings: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGGED_IN:
            const { user } = action.payload;
            return {
              ...state,
              user
            }
        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload,
                goToBookingSection: action.payload === 3 ? false : false
            };
        case actionTypes.CREATE_APPOINTMENT:
            return {
                ...state,
                isDealing: true,
            };
        case actionTypes.SHOW_BOOKING_HANDLER:
            return {
                ...state,
                showBookingSection: true,
                goToBookingSection: true
            };
        case actionTypes.HIDE_BOOKING_HANDLER:
            return {
                ...state,
                showBookingSection: false,
            };
        case actionTypes.BOOKING_HANDLER_VISITED:
          return {
              ...state,
              goToBookingSection: false,
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