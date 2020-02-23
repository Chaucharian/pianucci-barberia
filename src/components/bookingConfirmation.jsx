import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF"
    },
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
}

export const BookingConfirmation = (props) => {
    const { classes, bookingSelected, serviceSelected } = props; 
    console.log(new Date(bookingSelected.date));
    return (
        <div className={classes.container}>
            <button className="button" onClick={() => response('confirm')} >CONFIRMAR</button>
            <button className="button" onClick={() => response('cancel')}>CANCELAR</button>
        </div>
    );
}

export default withStyles(styles)(BookingConfirmation);


