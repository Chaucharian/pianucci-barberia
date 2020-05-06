import * as type from './types';
import * as actionTypes from './types';

export const userLoggedIn = user => ({
    type: actionTypes.USER_LOGGED_IN,
    payload: user
});

export const logoutUser = value => ({
    type: actionTypes.LOGOUT_USER,
    payload: value
});

export const reset = () => ({
    type: actionTypes.RESET
});


export const fetching = value => ({
    type: actionTypes.FETCHING,
    payload: value
});

export const bookingsFetched = bookings => ({
    type: actionTypes.BOOKINGS_FETCHED,
    payload: bookings
});

export const changePage = pageNumber => ({
    type: actionTypes.CHANGE_PAGE,
    payload: pageNumber
});

export const bookingCreated = action => ({
    type: actionTypes.BOOKING_CREATED,
    payload: action.payload
});

export const disableScrollDown = disable => ({
    type: actionTypes.DISABLE_SCROLL_DOWN,
    payload: disable
});

export const disableScrollUp = disable => ({
    type: actionTypes.DISABLE_SCROLL_UP,
    payload: disable
});

export const showBookingHandlerView = show => ({
    type: actionTypes.SHOW_BOOKING_HANDLER,
    payload: show 
});

export const showUserProfileView = show => ({
    type: actionTypes.SHOW_USER_PROFILE,
    payload: show 
});


export const hideBookingHandlerView = action => ({
    type: actionTypes.HIDE_BOOKING_HANDLER,
});

export const bookingHandlerVisited = () => ({
    type: actionTypes.BOOKING_HANDLER_VISITED,
}); 
