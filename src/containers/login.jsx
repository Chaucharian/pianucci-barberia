import React, { useState, useEffect } from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import firebase from "firebase";
import "firebase/auth";
import * as api from '../services/api';
import * as appActions from '../actions/app';
import ReactPageScroller from "react-page-scroller";
import SignInForm from '../components/signInForm';
import LogInForm from '../components/logInForm';

const styles = {
    login: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(240px, 1fr))",
        gridTemplateRows: "repeat(4, 100px)",
        backgroundColor: "#000",
        textAlign: "center",
        "& div > div": {
            outline: "none"
        }
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
    const [formErrors, setFormErrors] = useState([]);
    const [{ currentPage }, dispatch] = useStateValue();
    let pageScroller = null;

    const pageOnChange = scroll => {
        goToPage(scroll -1);
    }

    const goToPage = pageNumber => {
        if(pageNumber !== currentPage) {
            dispatch( appActions.changePage(pageNumber) );
        }
    }

    const setScrollHandler = scroll => {
        if(scroll) {
            pageScroller = scroll;
        }
    }

    const matchErrorsToFields = errorCode => {
        const errors = [];
        if(errorCode.includes('wrong-password')) {
            errors.push('password');
        } else if(errorCode.includes('user-not-found')) { 
            errors.push('email');
        } else if(errorCode.includes("email-already-in-use")) {
            errors.push('signInemail');
        }
        return errors;
    }

    const submitSignIn = user => {
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
            setFormErrors(matchErrorsToFields(error.code));
            console.log(error);
        });
    }

    const submitLogin = user => {
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
            setFormErrors(matchErrorsToFields(error.code));
            console.log(error);
        });
    }

    useEffect(() => {
        pageScroller.goToPage(currentPage);
    }, [currentPage]);

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange}>
                <LogInForm onSubmit={submitLogin} formErrors={formErrors} onChangePage={goToPage} ></LogInForm>
                <SignInForm onSubmit={submitSignIn} formErrors={formErrors}></SignInForm>
            </ReactPageScroller>
        </div>
    );
};

export default withStyles(styles)(Login);