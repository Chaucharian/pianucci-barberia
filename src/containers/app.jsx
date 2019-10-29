import React from 'react';
import { StateProvider, useStateValue } from '../state/rootState';
import {Router} from '../components/router';
import { useRedirect, navigate } from 'hookrouter';
import * as actionTypes from '../actions/types'

const App = () => {
  // sessionStorage.setItem('userSession', { bookings: [] });

  const initialState = {
    currentPage: 0,
    isDealing: false,
    showBookingSection: false,
    goToBookingSection: false,
    user: sessionStorage.getItem('userSession') ||  null,
    activeBookings: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
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

  if(initialState.user) {
    navigate('/');
  } else{
    navigate('/login');
  }
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router></Router>
    </StateProvider>
  );
}

export default App;