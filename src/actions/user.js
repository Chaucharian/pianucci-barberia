import * as type from './types';

export const createBooking = booking => ({
    type: type.CREATE_BOOKING,
    payload: booking ? booking.payload : null
}); 

export const updateBooking = booking => ({
    type: type.UPDATE_BOOKING,
    payload: booking ? booking.payload : null
}); 

export const deleteBooking = booking => ({
    type: type.DELETE_BOOKING,
    payload: booking ? booking.payload : null
}); 
