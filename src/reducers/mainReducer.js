import * as actionTypes from '../actions/types';

export const initialState = {
    currentPage: 0,
    showBookingSection: false,
    showUserProfileSection: false,
    user: { id: '', bookings: [], name: '', daysOff: [], notificationToken: '', phone: '', isAdmin: false },
    scrollUpDisabled: false,
    scrollDownDisabled: false,
    bookingCreated: false,
    logout: false,
    fetching: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCHING:
            const fetching = action.payload;
            return {
              ...state,
              fetching
            }
        case actionTypes.RESET:
            // reset state when the user logout
            return initialState
        case actionTypes.LOGOUT_USER:
            const logout = action.payload;
            return {
              ...state,
              logout
            }
        case actionTypes.BOOKINGS_FETCHED:
            const { user: userState } = state;
            const bookings = action.payload;
            return {
              ...state,
              user: { ...userState, bookings }
            }
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
        case actionTypes.SHOW_BOOKING_HANDLER:
            const showBookingSection = action.payload;

            return {
                ...state,
                showUserProfileSection: false,
                showBookingSection,
            };
        case actionTypes.SHOW_USER_PROFILE:
            const showUserProfileSection = action.payload;

            return {
                ...state,
                showBookingSection: false,
                showUserProfileSection,
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
  