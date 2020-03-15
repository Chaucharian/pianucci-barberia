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
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& h2": {
            fontWeight: "lighter"
        }
    },
    bookingListContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh / 2)"
    },
    bookingButton: {
        display: "flex",
        justifyContent: "center",
    }
}

const UserProfile = (props) => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const { user: { id: userId, bookings, name }, showBookingSection } = state;

    useEffect( () => {

    }, []);

    return (
        <div className={classes.container}>
            <h1>{name}</h1>
        </div>
    );  
  }
  

export default withStyles(styles)(UserProfile);
