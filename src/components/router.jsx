import React from 'react';
import {useRoutes} from 'hookrouter';
import {NotFoundPage} from './notFoundPage';
import HomePage from '../containers/homePage';
import Login from '../containers/login';

const routes = {
    '/': () => <HomePage />,
    '/login': () => <Login />,
};
	
export const Router = () => {
    const routeResult = useRoutes(routes);
    return routeResult || <NotFoundPage />;
}