import * as actionTypes from '../actions/types';

export const initialState = {
    currentPage: 0,
    isDealing: false,
    showBookingSection: false,
    showUserProfileSection: false,
    user: { id: '', bookings: [], name: '' },
    scrollUpDisabled: false,
    scrollDownDisabled: false,
    bookingCreated: false,
    logout: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT_USER:
            const logout = action.payload;
            // reset state when the user logout
            return {
              ...initialState,
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
        case actionTypes.CREATE_APPOINTMENT:
            return {
                ...state,
                isDealing: true,
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
  