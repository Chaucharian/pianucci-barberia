import * as actionTypes from '/actions/types';
import { useStateValue } from './context';
import { AuthService } from '/core/auth';

export const initialState = {
  auth: new AuthService(),
  currentPage: 0,
  showBookingSection: false,
  showUserProfileSection: false,
  business: {
    daysOff: [],
  },
  user: {
    id: '',
    bookings: [],
    name: '',
    hasFreeBooking: false,
    notificationToken: '',
    phone: '',
    isAdmin: false,
  },
  scrollUpDisabled: false,
  scrollDownDisabled: false,
  bookingCreated: false,
  logout: false,
  fetching: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      const fetching = action.payload;
      return {
        ...state,
        fetching,
      };
    case actionTypes.RESET:
      // reset state when the user logout
      return initialState;
    case actionTypes.LOGOUT_USER:
      const logout = action.payload;
      return {
        ...state,
        logout,
      };
    case actionTypes.BOOKINGS_FETCHED:
      const bookings = action.payload;
      return {
        ...state,
        user: { ...state.user, bookings },
      };
    case actionTypes.DISABLE_SCROLL_UP:
      const scrollUpDisabled = action.payload;
      return {
        ...state,
        scrollUpDisabled,
      };
    case actionTypes.DISABLE_SCROLL_DOWN:
      const scrollDownDisabled = action.payload;
      return {
        ...state,
        scrollDownDisabled,
      };
    case actionTypes.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.CHANGE_PAGE:
      const currentPage = action.payload;
      return {
        ...state,
        currentPage,
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
        bookingCreated,
      };
    case actionTypes.SET_DAYSOFF:
      return {
        ...state,
        business: { daysOff: action.payload },
      };
    case actionTypes.SET_USER_FREE_BOOKING:
      const hasFreeBooking = action.payload;
      return {
        ...state,
        user: { ...state.user, hasFreeBooking },
      };
    default:
      throw new Error('¡No action match!');
  }
};

export const useSelector = (selector) => {
  const [state] = useStateValue();
  return selector(state);
};

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.user;
export const selectBusiness = (state) => state.business;
