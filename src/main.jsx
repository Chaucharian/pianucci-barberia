import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import firebase from "firebase";

// navigator.serviceWorker
// .register('../firebase-messaging-sw.js')
// .then((registration) => {
//   firebase.messaging().useServiceWorker(registration);
// });

ReactDOM.render(
  <App></App>,
  document.getElementById('app')
);
