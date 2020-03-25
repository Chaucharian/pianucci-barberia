import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
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

const BookingAdminList = props => {
    const { classes, onAction } = props;
    const [state, dispatch] = useStateValue();
    const [refreshList, setRefreshList] = useState(false);
    const { user: { id: userId, bookings }, showBookingSection } = state;
    const matches = useMediaQuery('(min-width:600px)');

    const bookBooking = () => {
        onAction("bookingHandler");
    }

    const hasBookings = () => bookings.length > 0;

    const deleteBookingHandler = booking => {
        api.deleteBooking(booking.id).then( response => {
            setRefreshList(true);
        });
    }

    useEffect( () => {
        console.log(" EAA")
        // if(refreshList) {
            // api.getUserBookings(userId).then( response => {
            //     dispatch(appActions.bookingsFetched(response.bookings));
            //     setRefreshList(false);
            // });
            api.getAllBookingsByDate(Date.now()).then( ({bookings}) => {
                console.log(" BOOKINGS ",bookings);
                dispatch(appActions.bookingsFetched(bookings));
                setRefreshList(false);
            });
        // }
    }, []); 

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <div className={classes.bookingListContainer}>
            { 
                // hasBookings() ? 
                bookings.map( (booking, index) => <UserBooking key={index} booking={booking} onDelete={deleteBookingHandler} /> )
                // <h2>No tienes ningun turno activo :(</h2>  
            }
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingAdminList);
