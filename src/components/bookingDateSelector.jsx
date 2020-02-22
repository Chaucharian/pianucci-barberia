import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/styles';
import * as api from '../services/api';
import ScheduleList from './scheduleList';
import BookingItem from './bookingItem';
import DaysListSelector from './daysListSelector';

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        color: "#FFF"
    },
    bookings: {
        width: "60%",
        height: "300px",
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        alignItems: "center",
        "& button": {
            marginBottom: "10px"
        }
    },
}

export const BookingDateSelector = (props) => {
    const { classes, onBookingSelect } = props; 
    const [state, setState] = useState({ currentDate: Date.now(), bookings: [], showBookings: true});
    const { currentDate, showBookings, bookings } = state;
    const changeCurrentDate = (date, { showBookings }) => setState({ ...state, currentDate: date, showBookings });
    
    useEffect( () => {
        console.log(" NEW DATE ",new Date(currentDate));
        api.getSchedule(currentDate).then( ({bookings}) => {
            console.log("RESPONSE ",bookings);
            setState({ ...state, bookings });
        });
    }, [currentDate]);

    return (
        <div className={classes.container}>
            <DaysListSelector date={currentDate} onDateSelected={changeCurrentDate}/>
            { showBookings && <div className={classes.bookings}>
                { bookings.map( (booking, index) => (
                    <BookingItem key={index} booking={booking} onSelect={onBookingSelect}/>
                )) 
                }
            </div>
            }
        </div>
    );
}

export default withStyles(styles)(BookingDateSelector);


