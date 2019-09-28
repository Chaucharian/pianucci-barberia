import React from 'react';
import {useRoutes} from 'hookrouter';
import {NotFoundPage} from '../components/notFoundPage';
import {HomePage} from './homePage';
import Login from './login';

const routes = {
    '/': () => <HomePage />,
    '/login': () => <Login />,
};
	
export const Router = () => {
    const routeResult = useRoutes(routes);
    return routeResult || <NotFoundPage />;
}