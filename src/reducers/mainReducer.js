import * as actionTypes from '../actions/types';

export const initialState = {
    currentPage: 0,
    isDealing: false,
    showBookingSection: false,
    user: { id: '', bookings: [], name: '' },
    activeBookings: [],
    scrollUpDisabled: false,
    scrollDownDisabled: false,
    bookingCreated: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.DISABLE_SCROLL_UP:
            const scrollUpDisabled = action.payload;
            return {
              ...state,
              scrollUpDisabled
            }
        case actionTypes.DISABLE_SCROLL_DOWN:
            const scrollDownDisabled = action.payload;
            return {
                ...state,
                scrollDownDisabled
            }
        case actionTypes.USER_LOGGED_IN:
            const user = action.payload;
            return {
              ...state,
              user
            }
        case actionTypes.CHANGE_PAGE:
            const currentPage = action.payload;
            return {
                ...state,
                currentPage
            };
        case actionTypes.CREATE_APPOINTMENT:
            return {
                ...state,
                isDealing: true,
            };
        case actionTypes.SHOW_BOOKING_HANDLER:
            const showBookingSection = action.payload;

            return {
                ...state,
                showBookingSection,
            };
        case actionTypes.BOOKING_CREATED:
            const bookingCreated = action.payload;

            return {
                ...state,
                bookingCreated
            };
      default:
        return state;
    }
  };
  