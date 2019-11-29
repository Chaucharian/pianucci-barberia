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

export const getUserData = user => (
    fetch(enviroment.baseUrl + '/getUserData', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then( response => response.json() )
);
