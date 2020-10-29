import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, selectUser } from '/context'

export const PrivateRoute = ({
    component: Component,
    adminRequired,
    redirectPath = '/login',
    ...rest
}) => {
    const user = useSelector(selectUser)
    // const userLogged = user.id !== ''
    const userLogged = JSON.parse(window.localStorage.getItem('user'))
    let newRedirectPath = redirectPath
    console.log(user)
    const showRoute = () => {
        if (userLogged) {
            if (adminRequired) {
                if (user.isAdmin) {
                    return true
                } else {
                    return false
                }
            } else if (user.isAdmin) {
                // if user is admin redirect to admin panel
                newRedirectPath = '/admin'
                return false
            }
            return true
        } else {
            return false
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                showRoute() ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: newRedirectPath,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}
