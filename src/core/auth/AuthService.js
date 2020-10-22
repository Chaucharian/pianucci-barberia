import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";
import firebaseConfig from "../../../credentials/firebaseToken";
import * as api from "/services/api";

export class AuthService {
  constructor() {
    this.auth = firebase.initializeApp(firebaseConfig).auth();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout(user) {
    try {
      await this.auth.signOut();
      await api.logout(user.id);
      window.localStorage.removeItem("user");
    } catch (error) {
      console.error(`logout error ${error}`);
    }
  }
  
  setSW() {
    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("../../firebase-messaging-sw.js")
          .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
            console.log("SW installed");
          })
          .catch((err) => console.log("Service Worker Error", err));
      } else {
        console.log("SW not supported");
      }
    }); 
  }

  requestNotificationPermission = () =>
  new Promise((resolve, reject) =>
    Notification.requestPermission().then((permission) => {
      if (permission) {
        console.log("Notification permission granted.");
        const messaging = firebase.messaging();
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
          .getToken()
          .then((currentToken) => {
            if (currentToken) {
              resolve(currentToken);
            } else {
              reject(
                "No Instance ID token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            reject("Unable to get permission to notify.");
          });

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
          messaging
            .getToken()
            .then((refreshedToken) => {
              console.log("Token refreshed.");
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              // setTokenSentToServer(false);
              // Send Instance ID token to app server.
              // sendTokenToServer(refreshedToken);
              // ...
            })
            .catch((err) => {
              console.log("Unable to retrieve refreshed token ", err);
              showToken("Unable to retrieve refreshed token ", err);
            });
        });

        messaging.onMessage((payload) => {
          console.log("Message received. ", payload);
          // ...
        });
      } else {
        reject("Unable to get permission to notify.");
      }
    })
  );

}
