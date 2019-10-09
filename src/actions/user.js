import * as type from './types';

export const createAppointment = booking => ({
    type: type.CREATE_APPOINTMENT,
    payload: booking ? booking.payload : null
}); 
