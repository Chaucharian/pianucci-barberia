import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../state/rootState';
import * as actionTypes from '../actions/types';
import * as appActions from '../actions/app';
import RealBarberButton from '../components/realBarberButton';
import * as userActions from '../actions/user';
import ButtonAnimated from '../components/animatedButton';

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
    const matches = useMediaQuery('(min-width:600px)');
    const bookingList = state.user.bookings;

    const createAppointment = () => dispatch( appActions.showBookingHandlerView() );

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <div className={classes.bookingListContainer}>
            { 
                bookingList.length > 0 ? bookingList.map( booking => 
                <BookingItem data={booking}></BookingItem>) :
                <h2>Nunca reservaste :(</h2>  
            }
            </div>
            <div className={classes.bookingButton} >
                <RealBarberButton text={'reservar turno'} clicked={() => createAppointment()}></RealBarberButton>
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingList);
