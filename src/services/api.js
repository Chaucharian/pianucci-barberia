import { enviroment } from '../enviroment';
import { fetching } from '../actions/app';

export const createUser = user => (
    fetch(enviroment.baseUrl + '/createUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then( response => response.json() )
);

export const createBooking = booking => (
    fetch(enviroment.baseUrl + '/createBooking', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking)
    })
    .then( response => response.json() )
);

export const deleteBooking = bookingId => (
    fetch(enviroment.baseUrl + '/deleteBooking', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId })
    })
    .then( response => response.json() )
);

export const getUserData = userId => (
    fetch(enviroment.baseUrl + '/getUserData', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    })
    .then( response => response.json() )
);

export const getUserBookings = userId => (
    fetch(enviroment.baseUrl + '/getUserBookings', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    })
    .then( response => response.json() )
);

export const getSchedule = (dispatch, userDate) => {
    dispatch(fetching(true));
    return fetch(enviroment.baseUrl + '/getScheduleForDate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userDate})
    })
    .then( response => response.json() );
}

export const getAllBookingsByDate = userDate => (
    fetch(enviroment.baseUrl + '/getAllBookingsByDate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userDate})
    })
    .then( response => response.json() )
);

export const getAvailableHours = () => (
    fetch(enviroment.baseUrl + '/getAvailableHours', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then( response => response.json() )
);

export const setAvailableHours = (timeRange) => (
    fetch(enviroment.baseUrl + '/setAvailableHours', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeRange)
    })
    .then( response => response.json() )
);

export const sendNotificationToken = payload => (
    fetch(enviroment.baseUrl + '/setNotificationToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then( response => response.json() )
);

export const logout = userId => (
    fetch(enviroment.baseUrl + '/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    })
    .then( response => response.json() )
);

export const getImageGalery = () => (
    fetch(enviroment.baseUrl + '/getImageGalery', {
        method: 'GET',
    })
    .then( response => response.json() )
);

export const getDaysOff = () => (
    fetch(enviroment.baseUrl + '/getDaysOff', {
        method: 'GET',
    })
    .then( response => response.json() )
);

export const setDaysOff = days => (
    fetch(enviroment.baseUrl + '/setDaysOff', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days })
    })
    .then( response => response.json() )
);

export const getBookingsByType = bookingType => (
    fetch(enviroment.baseUrl + '/getBookingsByType', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingType })
    })
    .then( response => response.json() )
);

export const payBooking = amount => (
    fetch(enviroment.baseUrl + '/payBooking', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
    })
    .then( response => response.json() )
);