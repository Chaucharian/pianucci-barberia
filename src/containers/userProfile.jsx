import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import RealBarberButton from '../components/realBarberButton';
import UserBooking from '../components/userBooking';

const styles = {
    container: {
        paddingTop: "76px",
        "& ul": {
            listStyle: "none",
            fontSize: "15px"
        }
    },
    userData: {
        fontStyle: "normal",
        fontWeight: "lighter"
    }
}

const UserProfile = (props) => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const { user: { name, email, phone } } = state;

    return (
        <div className={classes.container}>
            <ul>
                <li>
                    <h1>Nombre <i className={classes.userData}>{name}</i></h1>
                </li>
                <li>
                    <h1>Email <i className={classes.userData}>{email}</i></h1>
                </li>
                <li>
                    <h1>Celular <i className={classes.userData}>{phone}</i></h1>
                </li>
            </ul>
        </div>
    );
}


export default withStyles(styles)(UserProfile);
