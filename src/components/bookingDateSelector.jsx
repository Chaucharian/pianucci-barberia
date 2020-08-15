import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/styles';
import * as api from '../services/api';
import BookingItem from './bookingItem';
import DaysListSelector from './daysListSelector';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import Spinner from './spinner';
import  { addDays, isToday, isTomorrow, getHours, getDay } from 'date-fns';
import { isDateDisabled } from '../utils/dates';

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
        alignItems: "center"
    },
    dateIndicator: {
        transition: "all 200ms ease",
        color: "red"
    }
}

export const BookingDateSelector = (props) => {
    const { classes, onBookingSelect } = props; 
    const [{ fetching, user: { daysOff } }, dispatch] = useStateValue();
    const [state, setState] = useState({ 
        currentDate: Date.now(),
        firstOpen: true,
        currentDateFormated: '',
        bookings: [],
        showBookings: true,
        comesFromCalendar: false
     });
    const { currentDate, 
            firstOpen,
            currentDateFormated,
            showBookings,
            comesFromCalendar,
            bookings } = state;

    const changeCurrentDate = ({date, dateFormated, showBookings, comesFromCalendar }) => {
        setState({ ...state, currentDate: date, currentDateFormated: dateFormated, showBookings, comesFromCalendar });
    }

    const todayEnd = bookings => {
        let dayEnded = false;
        if(bookings.length !== 0 && isToday(currentDate)) {
            dayEnded = getHours(currentDate) >= getHours(bookings[bookings.length -1].date);
        }
        return dayEnded;
    }

    const moveNextDay = () => setState( state => ({ ...state, currentDate: addDays(currentDate, 1).getTime() }));

    const openCalendar = defaultDate => setState({ ...state, currentDate: defaultDate, showBookings: false });
    
    useEffect( () => {
        console.log(daysOff);
        // While current date isn't free move one day
        if(isDateDisabled(daysOff, currentDate)) {
            moveNextDay();
        } else {
            // This is for hidding calendar when view first open
            if(firstOpen && !isToday(currentDate) && !isTomorrow(currentDate)) {
                setState( state => ({ ...state, firstOpen: false, showBookings: false }));
            }
            dispatch(appActions.fetching(true));
            api.getSchedule(currentDate).then( ({bookings}) => {
                dispatch(appActions.fetching(false));
                setState( state => ({ ...state, bookings }));
                // if today has ended, add it as a day off
                if(todayEnd(bookings)) {
                    dispatch(appActions.setDaysOff([...daysOff, getDay(currentDate) ]));
                }
            });
        }
    }, [currentDate, daysOff]);

    return (
        <div className={classes.container}>
            <DaysListSelector date={currentDate} showBookings={showBookings} daysOff={daysOff} onDaySelected={changeCurrentDate} onOpenCalendar={openCalendar}/>
            <Spinner loading={fetching && showBookings}>
                { (showBookings && comesFromCalendar) && <h3 className={classes.dateIndicator} >TURNOS PARA {currentDateFormated}</h3> }
                <div className={classes.bookings}>
                    {showBookings && bookings.map((booking, index) => <BookingItem key={index} booking={booking} onSelect={onBookingSelect} /> )}
                </div>
            </Spinner>  
        </div>
    );
}

export default withStyles(styles)(BookingDateSelector);


