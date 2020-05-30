import React from 'react';
import { withStyles } from '@material-ui/styles';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css' // Default Style
import  { addDays, isToday, isTomorrow, isMonday, isSunday, format } from 'date-fns';

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
export const isDateDisabled = date => isSunday(date) || isMonday(date);

export const DaysListSelector = (props) => {
    const { classes, date, showBookings, onOpenCalendar, onDaySelected } = props; 
    const isOtherDay = date => !isTomorrow(date) && !isToday(date);
    const dateToUnix = date => date.getTime();
    const startDate = dateToUnix(addDays(new Date(), 1));
    const endDate = dateToUnix(addDays(new Date(), 15));
    // FIX SENDING DATES IN UNIX DATE
    const daySelection = (date, calendarSelection = false) => {
        console.log(" DATE ",date);
        const unixDate = dateToUnix(date);
        const newBookingStatus = calendarSelection ? calendarSelection : !isOtherDay(date);
        const dateFormated = format(date,"dd/MM/yyyy");
        onDaySelected({ date: unixDate, dateFormated, showBookings: newBookingStatus, comesFromCalendar: calendarSelection });
    }

    const isWeekend = date => {
        const normalizedDate = addDays(date, 1);
        return isSunday(normalizedDate) || isMonday(normalizedDate);
    }

    const disableDates = date => date < new Date().getTime() || date > endDate || isWeekend(date);

    return (
        <div className={classes.container}>
            <div className={classes.days}>
                <h2 className={(isToday(date) ? classes.selected : '') +' '+ (isDateDisabled(new Date()) ? classes.disabled : '')} 
                    onClick={() => ( !isToday(date) ) && daySelection( new Date() ) }
                >
                    HOY 
                </h2>
                <h2 className={(isTomorrow(date) ? classes.selected : '') +' '+ (isDateDisabled(addDays(new Date(), 1)) ? classes.disabled : '')} 
                    onClick={() => ( !isTomorrow(date) ) && daySelection( addDays(new Date(), 1)) }
                >
                    MAÑANA
                </h2>
                <h2 className={!showBookings || isOtherDay(date) ? classes.selected : ''} 
                    onClick={() => ((isToday(date) || isTomorrow(date) ) && showBookings) && onOpenCalendar(addDays(new Date(), 2)) }
                >
                    OTRO DIA
                </h2>
            </div>
            { !showBookings && 
                <div className={classes.calendar}>
                    <Calendar 
                    dayLabels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
                    monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                    startDate={startDate} 
                    endDate={endDate} 
                    disableDates={disableDates}
                    timezone={"GMT"}
                    onChange={ date => daySelection(addDays(date, 1), true) }
                    />
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


