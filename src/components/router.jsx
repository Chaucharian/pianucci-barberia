import React, { useState, useEffect } from 'react';
import {useRoutes, useInterceptor, navigate} from 'hookrouter';
import firebase from "firebase";
import "firebase/auth";
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';

import {NotFoundPage} from './notFoundPage';
import MainViewer from '../containers/mainViewer';
import Login from '../containers/login';

const routes = {
    '/': () => <MainViewer />,
    '/login': () => <Login />,
};

export const Router = () => {
    const [state, setState] = useState({ loading: true });
    const [{ user, logout }, dispatch] = useStateValue();
    const routeResult = useRoutes(routes);
    const { loading } = state;

    const userHandler = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyD2y6eJmIuI-aT0muEMFtURhsXSev0HLhA",
            authDomain: "pianucci-barberia.firebaseapp.com",
            databaseURL: "https://pianucci-barberia.firebaseio.com",
            projectId: "pianucci-barberia",
            storageBucket: "pianucci-barberia.appspot.com",
            messagingSenderId: "276894270634",
            appId: "1:276894270634:web:663b249fd6a3c0e5827cd3",
            measurementId: "G-3BBYNVTEQR"
        };
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged( userSession => {
            if (userSession && user.id === "") {
                const sessionStored = JSON.parse(window.localStorage.getItem("user"));
                dispatch(appActions.userLoggedIn(sessionStored));
                navigate('/');
                setState({ loading: false });
            } else {
                navigate('/login');
                setState({ loading: false });
            }
        });
    }

    const logoutHandler = () => {
        firebase.auth().signOut().then( () => {
            // Sign-out successful.
            dispatch(appActions.logoutUser(false));
        }).catch(function (error) {
            // An error happened.
        });
    }

    const viewToRender = () => {
        let resultView = <h1>LOADING...</h1>;
        if(!loading) {
            resultView = routeResult;
        }
        return resultView;
    }

    useEffect( () => {
        userHandler();
    }, []);
    
    useEffect( () => {
        if(logout) {
            logoutHandler();
        }
    }, [logout]);
    
    return viewToRender() || <NotFoundPage />;
}