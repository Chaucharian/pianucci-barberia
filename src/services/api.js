import { enviroment } from '../enviroment';

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


export const getSchedule = userDate => (
    fetch(enviroment.baseUrl + '/getScheduleForDate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userDate})
    })
    .then( response => response.json() )
);