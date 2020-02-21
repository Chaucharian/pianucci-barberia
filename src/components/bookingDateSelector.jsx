import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';
import ScheduleList from './scheduleList';
import Calendar from '@lls/react-light-calendar'
import BookingItem from './bookingItem';
import '@lls/react-light-calendar/dist/index.css' // Default Style

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF"
    },
    bookings: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        "& button": {
            marginBottom: "10px"
        }
    },
}

export const BookingDateSelector = (props) => {
    const { classes, bookings, onBookingSelect } = props; 
    const [state, setState] = useState({ defaultDay: null});

    return (
        <div className={classes.container}>
            <div className={classes.bookings}>
                { bookings.map( (booking, index) => (
                    <BookingItem key={index} booking={booking} onSelect={onBookingSelect}/>
                )) 
                }
            </div>
        </div>
    );
}

export default withStyles(styles)(BookingDateSelector);


