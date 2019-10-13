import React, { useRef, useEffect, useState } from 'react'
import { useStateValue } from '../state/rootState';
import * as actionTypes from '../actions/types';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles'
import RealBarberButton from '../components/realBarberButton';
import * as userActions from '../actions/user';
import ButtonAnimated from '../components/animatedButton';
const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& div": {
            height: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& h2": {
                fontWeight: "lighter",
            }
        }
    }
}

const BookingList = (props) => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const bookingList = state.user.bookings;

    const createAppointment = () => dispatch( appActions.showBookingHandlerView() );

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            { 
                bookingList.length > 0 ? bookingList.map( booking => 
                <BookingItem data={booking}></BookingItem>) :
                <div><h2>Nunca reservaste :(</h2></div>  
            }
            <RealBarberButton text={'reservar turno'} clicked={() => createAppointment()}></RealBarberButton>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingList);
