import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import firebase from "firebase";
import "firebase/auth";
import * as api from '../services/api';
import * as appActions from '../actions/app';
import ReactPageScroller from "react-page-scroller";
import SignInForm from '../components/signInForm';
import LogInForm from '../components/logInForm';

import { requestNotificationPermission } from '../notificationHelper';
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
    const [isModalOpen, showModal] = useState(false);
    const [formErrors, setFormErrors] = useState([]);
    const [{ currentPage, fetching }, dispatch] = useStateValue();
    let pageScroller = null;

    const pageOnChange = scroll => {
        goToPage(scroll - 1);
    }

    const goToPage = pageNumber => {
        if (pageNumber !== currentPage) {
            dispatch(appActions.changePage(pageNumber));
        }
    }

    const setScrollHandler = scroll => {
        if (scroll) {
            pageScroller = scroll;
        }
    }

    const matchErrorsToFields = errorCode => {
        const errors = [];
        if (errorCode.includes('wrong-password')) {
            errors.push('password');
        } else if (errorCode.includes('user-not-found')) {
            errors.push('email');
        } else if (errorCode.includes("email-already-in-use")) {
            errors.push('signInemail');
        }
        return errors;
    }

    const submitSignIn = user => {
        dispatch(appActions.fetching(true));
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                const { email, uid: id } = response.user;
                const { name, phone } = user;
                const newUser = { email, id, name, phone };

                api.createUser(newUser)
                    .then(({ user }) => {
                        const sigin = () => {
                            dispatch(appActions.fetching(false));
                            window.localStorage.setItem("user", JSON.stringify(user));
                            dispatch(appActions.userLoggedIn(user));
                        }
                        showModal(true);
                        // whichever be the notification flow, login the user
                        requestNotificationPermission()
                            .then(token => {
                                showModal(false);
                                sigin();
                            })
                            .catch(() => {
                                showModal(false);
                                sigin();
                            })
                    });
            })
            .catch(function (error) {
                dispatch(appActions.fetching(false));
                setFormErrors(matchErrorsToFields(error.code));
                console.log(error);
            });
    }

    const submitLogin = user => {
        dispatch(appActions.fetching(true));
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                const { uid: userId } = response.user;

                api.getUserData(userId).then(({ user }) => {
                    api.getUserBookings(userId).then(({ bookings }) => {
                        const login = () => {
                            const userData = { ...user, bookings };
                            dispatch(appActions.fetching(false));
                            window.localStorage.setItem("user", JSON.stringify(userData));
                            dispatch(appActions.userLoggedIn(userData));
                        }
                        showModal(true);
                        // whichever be the notification flow, login the user
                        requestNotificationPermission()
                            .then(token => {
                                api.sendNotificationToken({ notificationToken: token, userId }).then(() => {});
                                showModal(false);
                                console.log(token);
                                login();
                            })
                            .catch(error => {
                                showModal(false);
                                console.log(error);
                                login();
                            });
                    });
                });
            })
            .catch(function (error) {
                dispatch(appActions.fetching(false));
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
                <LogInForm
                    showModal={isModalOpen}
                    fetching={fetching}
                    formErrors={formErrors}
                    onModalClose={() => showModal(false)}
                    onSubmit={submitLogin}
                    onChangePage={goToPage}>
                </LogInForm>
                <SignInForm
                    fetching={fetching}
                    formErrors={formErrors}
                    onSubmit={submitSignIn}>
                </SignInForm>
            </ReactPageScroller>
        </div>
    );
};

export default withStyles(styles)(Login);