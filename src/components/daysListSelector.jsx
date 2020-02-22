import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';
import  { addDays, isToday, isTomorrow, format } from 'date-fns';

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF"
    },
    selected: {
        color: "red"
    }
}

export const DaysListSelector = (props) => {
    const { classes, date, onDateSelected, onCalendarChange } = props; 
    const dateToUnix = date => date.getTime();

    return (
        <div className={classes.container}>
            <h2 className={isToday(date) ? classes.selected : ''} onClick={() => onDateSelected( dateToUnix(new Date()) )}>HOY</h2>
            <h2 className={isTomorrow(date) ? classes.selected : ''} onClick={() => onDateSelected( dateToUnix(addDays(new Date(), 1)) )}>MAÑANA</h2>
            <h2 className={(!isTomorrow(date) && !isToday(date)) ? classes.selected : ''} onClick={ () => {
                // set different day
                onDateSelected( dateToUnix(addDays(new Date(), 2)) );
                onCalendarChange(true);
                }}>OTRO DIA</h2>
        </div>
    );
}

export default withStyles(styles)(DaysListSelector);


