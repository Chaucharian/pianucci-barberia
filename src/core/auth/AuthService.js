import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../credentials/firebaseToken";
import * as api from "/services/api";

export class AuthService {
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

  async logout(user) {
    try {
      await this.auth.signOut();
      await api.logout(user.id);
      window.localStorage.removeItem("user");
    } catch (error) {
      console.error(`logout error ${error}`);
    }
  }
}
