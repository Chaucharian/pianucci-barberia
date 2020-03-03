import React from 'react';
import { withStyles } from '@material-ui/styles';
import  { getHours, format } from 'date-fns';

const styles = {
    container: {
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Raleway', sans-serif",
        fontSize: "calc(16px + (14 - 16) * (100vw - 400px) / (1440 - 400))",
        textDecoration: "none",
        textTransform: "uppercase",
        textAlign: "center",
        paddingBottom: "30px",
        paddingTop: "10px",
        border: "1px solid rgb(256, 256, 256)",
        backgroundColor: "#000",
        color: "#FFF",
        transition: "all 200ms ease",
        width: "80%",
        height: "40px",
        marginBottom: "15px",
    },
    active: {
        boxShadow: "-5px 5px 0 0 white"
    },
    inactive: {
        boxShadow: "-5px 5px 0 0 #636161"
    }
}

const UserBooking = (props) => {
    const { classes, booking, onDelete } = props;
    const { date, status } = booking;
    const dateFormated = format(date,"dd/MM/yyyy");
    const hour = getHours(date) >= 10 ? getHours(date)+":00" : "0"+getHours(date)+":00";
    const isBookingReserved = status === 'reserved';

    return (
        <div className={classes.container +' '+ (isBookingReserved ? classes.active : classes.inactive) }>
            { dateFormated }
            { hour }
            { isBookingReserved && <button onClick={onDelete(booking)}>X</button> }
        </div>
    );
}

export default withStyles(styles)(UserBooking);