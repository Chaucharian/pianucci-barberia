import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../state/rootState';
import * as actionTypes from '../actions/types';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import RealBarberButton from '../components/realBarberButton';
import * as userActions from '../actions/user';
import ButtonAnimated from '../components/animatedButton';
import BookingItem from '../components/bookingItem';

const styles = {
    container: {
        // display: "flex",
        // justifyContent: "center",
        // flexDirection: "column",
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

const BookingList = (props) => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const { user: { id: userId, bookings } } = state;
    const matches = useMediaQuery('(min-width:600px)');

    const createBooking = () => {
        dispatch( appActions.showBookingHandlerView(true) );
        dispatch( appActions.changePage(3) );
    }

    const hasBookings = () => bookings.length > 0;

    useEffect( () => {
        if(userId !== "") {
            api.getUserBookings(userId).then( response => {
                dispatch(appActions.bookingsFetched(response.bookings));
            });
        }
    }, [userId]); 

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <div className={classes.bookingListContainer}>
            { 
                hasBookings() ? bookings.map( (booking, index) => 
                <BookingItem key={index} booking={booking}></BookingItem>) :
                <h2>No tienes ningun turno activo :(</h2>  
            }
            </div>
            <div className={classes.bookingButton} >
                <RealBarberButton text={'reservar turno'} disabled={hasBookings()} clicked={() => createBooking()}></RealBarberButton>
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingList);
