import React, { useState, useEffect, useCallback } from 'react';
import {useRoutes, navigate} from 'hookrouter';
import firebase from "firebase";
import "firebase/auth";
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import * as api from '../services/api';
import {NotFoundPage} from '../components/notFoundPage';
import MainViewer from './mainViewer';
import Login from './login';
import loadingGif from '../assets/pianucci-loading.gif';

const routes = {
    '/': () => <MainViewer />,
    '/login': () => <Login />,
};

const LoadingImg = ({ image }) => <div style={{ display: "flex", width: "100%", justifyContent: "center" }}><img style={{width:"150px", height: "70px"}} src={image}></img></div>;

export const Router = () => {
    const [state, setState] = useState({ loading: true });
    const [{ user, logout, fetching }, dispatch] = useStateValue();
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

        // firebase.auth().onAuthStateChanged( userSession => {
        //     console.log(" USER ",user);
        //         if(user.id !== "" && user.justLoggedIn) {
        //             // const sessionStored = JSON.parse(window.localStorage.getItem("user"));
        //             // dispatch(appActions.userLoggedIn(sessionStored));
        //             navigate('/');
        //             setState({ loading: false });
        //         } else if(user.id === "") {
        //             const sessionStored = JSON.parse(window.localStorage.getItem("user"));
        //             // if a session exits
        //             if(sessionStored) { 
        //                 dispatch(appActions.userLoggedIn(sessionStored));
        //                 navigate('/');
        //             } else {
        //                 navigate('/login');
        //             }
        //             setState({ loading: false });
        //         }
        // });
    }

    const logoutHandler = () => {
        firebase.auth().signOut().then( () => {
            // Sign-out successful.
            window.localStorage.removeItem('user');
            dispatch(appActions.logoutUser(false));
            navigate('/login');
        }).catch(function (error) {
            // An error happened.
        });
    }

    const viewToRender = () => {
        let resultView = <LoadingImg image={loadingGif} />
        if(!loading) {
            resultView = routeResult;
        }
        return resultView;
    }

    useEffect( () => {
        userHandler();
        const sessionStored = JSON.parse(window.localStorage.getItem("user"));

        if(sessionStored && user.id === "") {
            dispatch(appActions.userLoggedIn(sessionStored));
            navigate('/');
            setState({ loading: false });
        } else {
            navigate('/login');
            setState({ loading: false });
        }
    }, [user]);

    useEffect( () => {
        if(user.id !== "") {
            navigate('/');
            setState({ loading: false });
        }
    }, [user]);
    
    useEffect( () => {
        if(logout) {
            logoutHandler();
        }
    }, [logout]);
    
    return viewToRender() || <NotFoundPage />;
}