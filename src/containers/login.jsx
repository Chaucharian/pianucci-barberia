import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import * as firebase from "firebase/app";
import "firebase/auth";
import { enviroment } from '../enviroment';
import * as appActions from '../actions/app';
import { useRedirect, navigate } from 'hookrouter';
import ReactPageScroller from "react-page-scroller";

import SignInForm from '../components/signInForm';
import LogInForm from '../components/logInForm';

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

const styles = {
    login: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(240px, 1fr))",
        gridTemplateRows: "repeat(4, 100px)",
        backgroundColor: "#000",
        textAlign: "center"
    },
    loginFormContainer: {
        height: "100%",
    },
    title: {
        width: "1fr",
        fontFamily: "'Alegreya Sans SC', sans-serif",
        color: "#FFF"
    }
}

const Login = (props) => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    let pageScroller = null;

    firebase.initializeApp(firebaseConfig);
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            navigate('/');
        }
    });

    // const logginWithInstagram = () => {
    //     window.open(enviroment.baseUrl+ '/instagram', 'firebaseAuth', 'height=315,width=400');
    // }

    const createUserWithEmail = user => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( response => console.log(response)
        )
        .catch(function(error) {
            
        });
    }

    const loginWithEmail = user => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( response => {
            let user = { id: '', bookings: [] };
            const { email, uid } = response.user;
            // retrieve user related data from db
            firebase.database().ref('/users/' + uid).once('value').then( (snapshot) => {
                user.bookings = snapshot.bookings | [];
                user.email = email;
                user.id = uid;

                dispatch( appActions.userLoggedIn(user) );
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
        
    const pageOnChange = scroll => {
        // dispatch( appActions.changePage({ payload: scroll }) );
        // if(scroll === 3) {
        //     dispatch( appActions.bookingHandlerVisited() );
        // }
    }

    const goToPage = (page) => {
        // dispatch( appActions.changePage({ payload: page }) );
    }

    const setScrollHandler = scroll => {
        if(scroll) {
            pageScroller = scroll;
        }
    }

    const loginFormActions = action => {
        if(action === 'changeView') {
            pageScroller.goToPage(1);
        } else {
            loginWithEmail(action.user);
        }
    }

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange} blockScrollDown={false}>
                <LogInForm onAction={ action => loginFormActions(action) }></LogInForm>
                <SignInForm onAction={ action => createUserWithEmail(action.user) }></SignInForm>
            </ReactPageScroller>
        </div>
    );
};

export default withStyles(styles)(Login);