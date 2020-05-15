import React from 'react';
import { withStyles } from '@material-ui/styles';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css' // Default Style
import  { addDays, isToday, isTomorrow } from 'date-fns';

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
            marginRight: "10px",
            marginBottom: "3px"
        }
    },
    calendar: {
        overflow: "auto"
    },
    selected: {
        color: "red"
    },
    disabled: {
        color: "grey",
        cursor: "default"
    }
}

export const DaysListSelector = (props) => {
    const { classes, date, showBookings, onDaySelected } = props; 
    const isOtherDay = date => !isTomorrow(date) && !isToday(date);
    const dateToUnix = date => date.getTime();

    const daySelection = (date, calendarSelection) => {
        const unixDate = dateToUnix(date);
        let newBookingStatus = calendarSelection ? calendarSelection : !isOtherDay(date);
        onDaySelected( unixDate, { showBookings: newBookingStatus });
    }

    const isWeekend = date => new Date(date).getDay() === 5 || new Date(date).getDay() === 6;

    const disableDates = date => date < new Date().getTime() || date > addDays(new Date(), 7) || isWeekend(date);

    return (
        <div className={classes.container}>
            <div className={classes.days}>
                <h2 className={(isToday(date) ? classes.selected : '') +' '+ (isWeekend(date) ? classes.disablePointer : '')} 
                    onClick={() => ( !isToday(date) && !isWeekend(date) ) && daySelection( new Date() ) }
                >
                    HOY 
                </h2>
                <h2 className={(isTomorrow(date) ? classes.selected : '') +' '+ (isWeekend(date) ? classes.disabled : '')} 
                    onClick={() => ( !isTomorrow(date) && !isWeekend(date) ) && daySelection( addDays(new Date(), 1)) }
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
                <div className={classes.calendar}>
                    <Calendar 
                    dayLabels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
                    monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                    startDate={dateToUnix(addDays(new Date(), 1))} 
                    endDate={dateToUnix(addDays(new Date(), 14))} 
                    disableDates={disableDates}
                    onChange={ date => daySelection(addDays(date, 1), true) }/>
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


