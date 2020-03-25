import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import firebase from "firebase";
import "firebase/auth";

import * as api from '../services/api';
import * as appActions from '../actions/app';
import { useRedirect, navigate } from 'hookrouter';
import ReactPageScroller from "react-page-scroller";

import SignInForm from '../components/signInForm';
import LogInForm from '../components/logInForm';

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

  
  
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         navigate('/');
    //     }
    // });

    // const logginWithInstagram = () => {
    //     window.open(enviroment.baseUrl+ '/instagram', 'firebaseAuth', 'height=315,width=400');
    // }

    const createUserWithEmail = user => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( response => {
            const { email, uid: id } = response.user;
            const { name, phone } = user;
            const newUser = { email, id, name, phone };
            
            api.createUser(newUser)
            .then( ({ user }) => {
                window.localStorage.setItem("user", JSON.stringify(user));
                dispatch(appActions.userLoggedIn(user));
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    const loginWithEmail = user => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( response => {
            const { uid: userId } = response.user;
            
            api.getUserData(userId).then( ({ user }) => {
                api.getUserBookings(userId).then( ({ bookings }) => { 
                    const userData = { ...user, bookings };
                    window.localStorage.setItem("user", JSON.stringify(userData));
                    dispatch(appActions.userLoggedIn(userData));
                });
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
            loginWithEmail(action);
        }
    }

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange} blockScrollDown={false}>
                <LogInForm onAction={ action => loginFormActions(action) }></LogInForm>
                <SignInForm onAction={ action => createUserWithEmail(action) }></SignInForm>
            </ReactPageScroller>
        </div>
    );
};

export default withStyles(styles)(Login);