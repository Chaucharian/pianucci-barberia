import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import Spinner from '../components/spinner';
import UserBooking from '../components/userBooking';

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
        },
        "& h2": {
            fontWeight: "lighter"
        }
    },
    bookingListContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        margin: "10px"
    },
}

const SpecialBookings = props => {
    const { classes } = props;
    const [refreshList, setRefreshList] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [state] = useStateValue();
    const { fetching, currentPage } = state;

    const deleteBookingHandler = ({ id }) => {
        api.deleteBooking(id).then( () => setRefreshList(true) );
    }

    const hasBookings = () => bookings.length > 0;

    const normalizeBooking = booking => ({ ...booking, date: 0 });

    const showBookings = () => hasBookings() ? bookings.map( (booking, index) => <UserBooking key={index} booking={normalizeBooking(booking)} onDelete={deleteBookingHandler} />) : false;

    useEffect( () => {
        if(refreshList || currentPage === 3) {
            api.getBookingsByType('VIP').then( ({ bookings }) => {
                setBookings(bookings);
                setRefreshList(false);
            });
        }
    }, [currentPage, refreshList]); 

    return (
        <div className={classes.container}>
            <h1>VIP</h1>
            <Spinner loading={fetching && showBookings}>
                <div className={classes.bookingListContainer}>
                    { showBookings() || <h2>No hay reservas <br></br>&#x1F625;</h2> }
                </div>
            </Spinner>
        </div>
    );  
  }
  

export default withStyles(styles)(SpecialBookings);