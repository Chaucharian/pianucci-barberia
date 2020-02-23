import React from 'react';
import { withStyles } from '@material-ui/styles';
import AnimatedButton from './animatedButton';
import  { getHours, format } from 'date-fns';

const styles = {
}

const BookingItem = (props) => {
    const { classes, booking, onSelect } = props;
    const { date, status } = booking;
    const hour = getHours(date) >= 10 ? getHours(date)+":00" : "0"+getHours(date)+":00";
    const isBookingReserved = status === 'reserved';

    return (
        <AnimatedButton onSelect={() => {
            if(!isBookingReserved) {
                onSelect(booking);
            }
        }} text={hour} strong={true} disabled={isBookingReserved}></AnimatedButton>
    );
}

export default withStyles(styles)(BookingItem);