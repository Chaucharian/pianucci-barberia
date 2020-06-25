import React from 'react';
import { withStyles } from '@material-ui/styles';
import { format, isToday } from 'date-fns';
import ReflectButton from './reflectButton';

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
    description: {
        "& ul": {
            listStyle: "none"
        }
    },
    buttons: {
        display: "flex",
        padding: "5px"
    },
    list: {
        textAlign: "left"
    },
    warning: {
        color: "red"
    }
}

export const BookingConfirmation = (props) => {
    const { classes, bookingSelected, serviceSelected, onSubmit } = props; 
    const { date } = bookingSelected;
    const { name: serviceName, duration } = serviceSelected;
    const dateFormated = typeof date === 'string' ? date : format(date,"dd/MM/yyyy");
    const hours = typeof date === 'string' ? null : new Date(date).getHours();

    return (
        <div className={classes.container}>
            <div className={classes.description}>
                <h2>INFORMACIÓN DEL TURNO</h2>
                <ul className={classes.list}>
                    <li>
                        <p><b>Día </b> {dateFormated}</p>
                        { hours && <p><b>Hora </b> {hours}</p> }
                        <p><b>Duración </b> {duration}</p>
                        <p><b>Turno </b> {serviceName}</p>
                        <p><b>Ubicación </b> Pianucci Barberia - 25 de Mayo 1234 2 º B</p>
                    </li>
                </ul>
                { isToday(date) && <p className={classes.warning}><b>¡ESPERA! Verifica que los datos sean correctos, este turno no se podra cancelar</b></p> }
            </div>
            <div className={classes.buttons}>
                <ReflectButton text="CANCELAR" clicked={() => onSubmit("cancel")} />
                <ReflectButton text="CONFIRMAR" clicked={() => onSubmit("confirm")} />
            </div>
        </div>
    );
}

export default withStyles(styles)(BookingConfirmation);


