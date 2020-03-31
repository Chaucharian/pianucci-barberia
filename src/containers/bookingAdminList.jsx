import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import UserBooking from '../components/userBooking';
import DaysListSelector from '../components/daysListSelector';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& h1": {
            marginBottom: "0px"
        }
    },
    bookingListContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "60%",
        overflow: "auto",
        padding: "10px"
    },
    daySelector: {
        display: "flex",
        justifyContent: "center"
    }
}

const BookingAdminList = props => {
    const { classes, onDisableScroll } = props;
    const [state, dispatch] = useStateValue();
    const [refreshList, setRefreshList] = useState(false);
    const [currentDate, setCurrentDate] = useState(Date.now());
    const [showBookings, setShowBookings] = useState(true);
    const { user: { bookings } } = state;

    const hasBookings = () => bookings.length > 0;

    const deleteBookingHandler = booking => {
        api.deleteBooking(booking.id).then( response => {
            setRefreshList(true);
        });
    }

    const changeDay = (date, { showBookings}) => {
        setCurrentDate(date);
        setShowBookings(showBookings);
    }

    useEffect( () => {
        api.getAllBookingsByDate(currentDate).then( ({bookings}) => {
            dispatch(appActions.bookingsFetched(bookings));
            setRefreshList(false);
        });
    }, [currentDate, refreshList]); 

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <div className={classes.daySelector}>   
                <DaysListSelector  date={currentDate} showBookings={showBookings} onDaySelected={changeDay}/>
            </div>
            <div className={classes.bookingListContainer} onScroll={ () => onDisableScroll(true)}>
            { 
                showBookings && (
                hasBookings() ? 
                bookings.map( (booking, index) => <UserBooking key={index} booking={booking} onDelete={deleteBookingHandler} /> ) 
                :
                <h2>No hay turnos para la fecha seleccionada</h2> 
                )
            }
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(BookingAdminList);