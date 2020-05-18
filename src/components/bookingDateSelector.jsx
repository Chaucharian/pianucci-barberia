import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/styles';
import * as api from '../services/api';
import BookingItem from './bookingItem';
import DaysListSelector from './daysListSelector';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import Spinner from './spinner';

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
    const [{ fetching }, dispatch] = useStateValue();
    const [state, setState] = useState({ currentDate: Date.now(), currentDateFormated: '', bookings: [], showBookings: true, comesFromCalendar: false});
    const { currentDate, currentDateFormated, showBookings, comesFromCalendar, bookings } = state;

    const changeCurrentDate = ({date, dateFormated, showBookings, comesFromCalendar }) => {
        setState({ ...state, currentDate: date, currentDateFormated: dateFormated, showBookings, comesFromCalendar });
    }

    const openCalendar = defaultDate => setState({ ...state, currentDate: defaultDate, showBookings: false });
    
    useEffect( () => {
        api.getSchedule(dispatch, currentDate).then( ({bookings}) => {
            dispatch(appActions.fetching(false));
            setState( state => ({ ...state, bookings }));
        });
    }, [currentDate]);

    return (
        <div className={classes.container}>
            <DaysListSelector date={currentDate} showBookings={showBookings} onDaySelected={changeCurrentDate} onOpenCalendar={openCalendar}/>
            <Spinner loading={fetching && showBookings}>
                { comesFromCalendar && <h3 className={classes.dateIndicator} >TURNOS PARA {currentDateFormated}</h3> }
                <div className={classes.bookings}>
                    {showBookings && bookings.map((booking, index) => <BookingItem key={index} booking={booking} onSelect={onBookingSelect} /> )}
                </div>
            </Spinner>  
        </div>
    );
}

export default withStyles(styles)(BookingDateSelector);


