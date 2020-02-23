import React, {useState} from 'react';
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
            marginRight: "5px"
        }
    },
    selected: {
        color: "red"
    }
}

export const DaysListSelector = (props) => {
    const { classes, date, onDateSelected } = props; 
    const [state, setState] = useState({ calendarSelectionDone: false });
    const { calendarSelectionDone } = state;
    const isOtherDay = !isTomorrow(date) && !isToday(date);
    const dateToUnix = date => date.getTime();
    const daySelection = date => {
        setState({ calendarSelectionDone: false });
        onDateSelected( date, { showBookings: true });
    }
    const calendarSelection = date => {
        setState({ calendarSelectionDone: true });
        onDateSelected(date, { showBookings: true })
    }

    return (
        <div className={classes.container}>
            <div className={classes.days}>
                <h2 className={isToday(date) ? classes.selected : ''} 
                    onClick={() => !isToday(date) && daySelection( dateToUnix(new Date()) ) }
                >
                    HOY 
                </h2>
                <h2 className={isTomorrow(date) ? classes.selected : ''} 
                    onClick={() => !isTomorrow(date) && daySelection( dateToUnix(addDays(new Date(), 1)), { showBookings: true })}
                >
                    MAÑANA
                </h2>
                <h2 className={isOtherDay ? classes.selected : ''} 
                    onClick={() => !isOtherDay && onDateSelected(dateToUnix(addDays(new Date(), 2)), { showBookings: false })}
                >
                    OTRO DIA
                </h2>
            </div>
            { (isOtherDay && !calendarSelectionDone) && 
                <Calendar 
                    startDate={dateToUnix(addDays(new Date(), 2))} 
                    endDate={new Date().setDate(new Date().getDate() + 14)} 
                    disableDates={date => date < new Date().getTime() && date > new Date().getTime() + 14}
                    onChange={calendarSelection}/>
            }
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


