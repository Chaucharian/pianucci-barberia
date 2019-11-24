import React from 'react';
import {Router} from '../components/router';
import { useRedirect, navigate } from 'hookrouter';
import firebase from "firebase";
import "firebase/auth";

import { enviroment } from '../enviroment';
import { StateProvider, useStateValue } from '../state/rootState';
import { reducer, initialState } from '../reducers/mainReducer';

const App = () => {

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

  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged( user => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
  });

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router></Router>
    </StateProvider>
  );
}

export default App;