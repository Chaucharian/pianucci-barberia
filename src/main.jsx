import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import firebase from "firebase";

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(registration => {
        firebase.messaging().useServiceWorker(registration);
        console.log("SW installed");
      })
      .catch(err => console.log('Service Worker Error', err))
  } else {
    console.log("SW not supported");
  }
});

ReactDOM.render(
  <App></App>,
  document.getElementById('app')
);
