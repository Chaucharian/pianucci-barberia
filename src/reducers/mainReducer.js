import * as actionTypes from '../actions/types';

export const initialState = {
    currentPage: 0,
    isDealing: false,
    showBookingSection: false,
    goToBookingSection: false,
    user: { id: '', bookings: [], name: '' },
    activeBookings: [],
    isScrollEnabled: true 
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SCROLL_STATUS:
            const isScrollEnabled = action.payload;
            return {
              ...state,
              isScrollEnabled
            }
        case actionTypes.USER_LOGGED_IN:
            const user = action.payload;
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
              showBookingSection: false,
            };
      default:
        return state;
    }
  };
  