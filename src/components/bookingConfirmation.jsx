import React from 'react';
import { withStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import AnimatedButton from './animatedButton';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
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
    const { date } = bookingSelected;
    const { name: serviceName, duration } = serviceSelected;
    const dateFormated = format(date,"dd/mm/yyyy");
    const hours = new Date(date).getHours();
    console.log(serviceSelected);
    return (
        <div className={classes.container}>
            <div className={classes.description}>
                <h2>INFORMACIÓN DEL TURNO</h2>
                <ul>
                    <li>
                        <p><b>Día </b> {dateFormated}</p>
                        <p><b>Hora </b> {hours}</p>
                        <p><b>Duración </b> {duration} minutos</p>
                        <p><b>Estilo </b> {serviceName}</p>
                        <p><b>Ubicación </b> Pianucci Barberia - 25 de Mayo 1234 2 º B</p>
                    </li>
                </ul>
            </div>
            <AnimatedButton text="CONFIRMAR"/> 
            <AnimatedButton text="CANCELAR"/> 
        </div>
    );
}

export default withStyles(styles)(BookingConfirmation);


