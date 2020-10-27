import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import { useStateValue } from '../context/context'
import * as api from '../services/api'
import * as appActions from '../actions/app'
import ReactPageScroller from 'react-page-scroller'
import SignInForm from 'components/signInForm'
import LogInForm from 'components/logInForm'
import { useSelector, selectAuth, selectUser } from 'context'
import { useHistory } from 'react-router-dom'
import { MODAL_TYPES } from 'components/Modal'

const styles = {
    login: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(240px, 1fr))',
        gridTemplateRows: 'repeat(4, 100px)',
        backgroundColor: '#000',
        textAlign: 'center',
        '& div > div': {
            outline: 'none',
        },
    },
    loginFormContainer: {
        height: '100%',
    },
    title: {
        width: '1fr',
        fontFamily: "'Alegreya Sans SC', sans-serif",
        color: '#FFF',
    },
}

const Login = (props) => {
    const { classes } = props
    const [isModalOpen, showModal] = useState('')
    const [formErrors, setFormErrors] = useState([])
    const [{ currentPage, fetching }, dispatch] = useStateValue()
    const auth = useSelector(selectAuth)
    const history = useHistory()
    const user = useSelector(selectUser)

    let pageScroller = null

    const pageOnChange = (scroll) => {
        goToPage(scroll - 1)
    }

    const goToPage = (pageNumber) => {
        if (pageNumber !== currentPage) {
            dispatch(appActions.changePage(pageNumber))
        }
    }

    const setScrollHandler = (scroll) => {
        if (scroll) {
            pageScroller = scroll
        }
    }

    const matchErrorsToFields = (errorCode) => {
        const errors = []
        if (errorCode.includes('wrong-password')) {
            errors.push('password')
        } else if (errorCode.includes('user-not-found')) {
            errors.push('email')
        } else if (errorCode.includes('email-already-in-use')) {
            errors.push('signInemail')
        }
        return errors
    }

    const submitSignIn = (user) => {
        dispatch(appActions.fetching(true))
        auth.signIn(user.email, user.password)
            .then((response) => {
                const { email, uid: id } = response.user
                const { name, lastname, phone } = user
                const newUser = { email, id, name, lastname, phone }

                api.createUser(newUser).then(({ user, daysOff }) => {
                    const sigin = (token) => {
                        const userData = {
                            ...user,
                            notificationToken: token,
                            daysOff,
                        }
                        dispatch(appActions.fetching(false))
                        window.localStorage.setItem(
                            'user',
                            JSON.stringify(userData)
                        )
                        dispatch(appActions.userLoggedIn(userData))
                        history.push('/')
                    }
                    showModal(MODAL_TYPES.notification)
                    // whichever be the notification flow, login the user
                    auth.requestNotificationPermission()
                        .then((token) => {
                            api.sendNotificationToken({
                                notificationToken: token,
                                userId,
                            }).then(() => {})
                            showModal('')
                            sigin(token)
                        })
                        .catch((error) => {
                            sigin(error)
                            showModal('')
                            sigin(error)
                        })
                })
            })
            .catch(function (error) {
                dispatch(appActions.fetching(false))
                setFormErrors(matchErrorsToFields(error.code))
                console.log(error)
            })
    }

    const submitLogin = (user) => {
        dispatch(appActions.fetching(true))
        auth.login(user.email, user.password)
            .then((response) => {
                const { uid: userId } = response.user

                api.getUserData(userId).then(({ user, daysOff }) => {
                    // api.getUserBookings(userId).then(({ bookings }) => {
                    const login = async (token) => {
                        const userData = {
                            ...user,
                            notificationToken: token,
                            daysOff,
                        }
                        dispatch(appActions.fetching(false))
                        window.localStorage.setItem(
                            'user',
                            JSON.stringify(userData)
                        )
                        await dispatch(appActions.userLoggedIn(userData))
                        if (userData.isAdmin) {
                            history.push('/admin')
                        } else {
                            history.push('/')
                        }
                    }
                    showModal(MODAL_TYPES.notification)
                    // whichever be the notification flow, login the user
                    auth.requestNotificationPermission()
                        .then((token) => {
                            api.sendNotificationToken({
                                notificationToken: token,
                                userId,
                            }).then(() => {})
                            showModal('')
                            console.log(token)
                            login(token)
                        })
                        .catch((error) => {
                            showModal('')
                            console.log(error)
                            login()
                        })
                })
                // });
            })
            .catch(function (error) {
                dispatch(appActions.fetching(false))
                setFormErrors(matchErrorsToFields(error.code))
                console.log(error)
            })
    }

    useEffect(() => {
        pageScroller.goToPage(currentPage)
    }, [currentPage])

    useEffect(() => {
        if (user.id !== '') {
            history.push('/')
        }
    }, [user])

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReactPageScroller
                ref={setScrollHandler}
                pageOnChange={pageOnChange}
            >
                <LogInForm
                    showModal={isModalOpen}
                    fetching={fetching}
                    formErrors={formErrors}
                    onModalClose={() => showModal(false)}
                    onSubmit={submitLogin}
                    onChangePage={goToPage}
                ></LogInForm>
                <SignInForm
                    fetching={fetching}
                    formErrors={formErrors}
                    onSubmit={submitSignIn}
                ></SignInForm>
            </ReactPageScroller>
        </div>
    )
}

export default withStyles(styles)(Login)
