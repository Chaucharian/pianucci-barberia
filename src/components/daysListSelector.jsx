import React from 'react';
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
            marginRight: "10px",
            marginBottom: "3px"
        }
    },
    calendar: {
        overflow: "auto",
        "& .rlc-day": {
            color: "white"
        },
        "& .rlc-day-disabled": {
            color: "#cecece"
        }
    },
    selected: {
        color: "red"
    },
    disabled: {
        color: "grey",
        cursor: "default"
    }
}
export const isDateDisabled = (daysOff, date) => daysOff.filter( dayOff => new Date(date).getDay() === dayOff).length !== 0 ? true : false;

export const DaysListSelector = (props) => {
    const { classes, date, showBookings, daysOff, onOpenCalendar, onDaySelected } = props; 
    const isOtherDay = date => !isTomorrow(date) && !isToday(date);
    const dateToUnix = date => date.getTime();
    const startDate = dateToUnix(addDays(new Date(), 2));
    const endDate = dateToUnix(addDays(new Date(), 15));

    const daySelection = (date, calendarSelection = false) => {
        const unixDate = dateToUnix(date);
        const newBookingStatus = calendarSelection ? calendarSelection : !isOtherDay(date);
        const dateFormated = format(date,"dd/MM/yyyy");
        onDaySelected({ date: unixDate, dateFormated, showBookings: newBookingStatus, comesFromCalendar: calendarSelection });
    }

    const disableDates = date => date < new Date().getTime() || date > endDate || date < startDate || isDateDisabled(daysOff, date);

    return (
        <div className={classes.container}>
            <div className={classes.days}>
                <h2 className={(isToday(date) ? classes.selected : '') +' '+ (isDateDisabled(daysOff,new Date()) ? classes.disabled : '')} 
                    onClick={() => !isDateDisabled(daysOff,new Date()) && daySelection( new Date() ) }
                >
                    HOY 
                </h2>
                <h2 className={(isTomorrow(date) ? classes.selected : '') +' '+ (isDateDisabled(daysOff,addDays(new Date(), 1)) ? classes.disabled : '')} 
                    onClick={() => !isDateDisabled(daysOff,addDays(new Date(), 1)) && daySelection( addDays(new Date(), 1)) }
                >
                    MAÑANA
                </h2>
                <h2 className={!showBookings || isOtherDay(date) ? classes.selected : ''} 
                    onClick={() => (showBookings) && onOpenCalendar(dateToUnix(addDays(new Date(), 2))) }
                >
                    OTRO DIA
                </h2>
            </div>
            { !showBookings && 
                <div className={classes.calendar}>
                    <Calendar 
                    dayLabels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
                    monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                    disableDates={ date => disableDates(addDays(date, 1)) }
                    onChange={ date => daySelection(addDays(date, 1), true) }
                    />
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


