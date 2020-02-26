import React, {useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css' // Default Style
import  { addDays, isToday, isTomorrow, format } from 'date-fns';

const styles = {
    container: {
        display: "block",
        color: "#FFF"
    },
    days: {
        display: "flex",
        cursor: "pointer",
        "& h2": {
            transition: "all 200ms ease",
            marginRight: "10px"
        }
    },
    selected: {
        color: "red"
    }
}

export const DaysListSelector = (props) => {
    const { classes, date, showBookings, onDaySelected } = props; 
    const isOtherDay = date => !isTomorrow(date) && !isToday(date);
    const dateToUnix = date => date.getTime();

    // const daySelection = date => {
    //     setState({ calendarSelectionDone: false });
    //     onDateSelected( date, { showBookings: true });
    // }
    // const calendarSelection = date => {
    //     setState({ calendarSelectionDone: true });
    //     onDateSelected(dateToUnix(addDays(date, 1)), { showBookings: true });
    // }

    const daySelection = (date, calendarSelection) => {
        const unixDate = dateToUnix(date);
        let newBookingStatus = calendarSelection ? calendarSelection : !isOtherDay(date);
        console.log(" SHOW BOOKINGS ",showBookings);
        onDaySelected( unixDate, { showBookings: newBookingStatus });
    }

    return (
        <div className={classes.container}>
            <div className={classes.days}>
                <h2 className={isToday(date) ? classes.selected : ''} 
                    onClick={() => !isToday(date) && daySelection( new Date() ) }
                >
                    HOY 
                </h2>
                <h2 className={isTomorrow(date) ? classes.selected : ''} 
                    onClick={() => !isTomorrow(date) && daySelection( addDays(new Date(), 1))}
                >
                    MAÑANA
                </h2>
                <h2 className={isOtherDay(date) ? classes.selected : ''} 
                    onClick={() => !isOtherDay(date) && daySelection(addDays(new Date(), 2))}
                >
                    OTRO DIA
                </h2>
            </div>
            { (isOtherDay(date) && !showBookings) && 
                <Calendar 
                    startDate={dateToUnix(addDays(new Date(), 2))} 
                    endDate={new Date().setDate(new Date().getDate() + 14)} 
                    disableDates={date => date < new Date().getTime() && date > new Date().getTime() + 14}
                    onChange={ date => daySelection(addDays(date, 1), true) }/>
            }
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


