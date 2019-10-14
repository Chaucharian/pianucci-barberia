import * as type from './types';
import * as actionTypes from './types';

export const changePage = action => ({
    type: actionTypes.CHANGE_PAGE,
    payload:  action.payload
}); 

export const showBookingHandlerView = action => ({
    type: actionTypes.SHOW_BOOKING_HANDLER,
}); 

export const hideBookingHandlerView = action => ({
    type: actionTypes.HIDE_BOOKING_HANDLER,
}); 

export const bookingHandlerVisited = () => ({
    type: actionTypes.BOOKING_HANDLER_VISITED,
}); 
