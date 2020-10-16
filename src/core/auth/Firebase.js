import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../credentials/firebaseToken";

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}

export default Firebase;
