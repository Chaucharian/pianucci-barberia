import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles';
import StepIndicator from '../components/stepIndicator';
import ViewSwitcher from '../components/viewSwitcher';
import ServiceTypeSelector from '../components/serviceTypeSelector';
import BookingConfirmation from '../components/bookingConfirmation';
import BookingDateSelector from '../components/bookingDateSelector';
import * as userActions from '../actions/user';

const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "50px",
        color: "#FFF"
    },
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
}

export const BookingHandler = (props) => {
    const { classes, booking } = props; 
    const [internalState, setState] = useState({currentStep: 1, serviceSelected: '', bookings: [] });
    const [state, dispatch] = useStateValue();
    const { activeBookings } = state;
    const { currentStep, serviceSelected, bookings } = internalState;

    const bookingConfirmationHandler = response => {
        if (response === 'confirm') {
            createBooking({ serviceSelected, date });
        } else {
            setState({ ...internalState, currentStep: 2 });
        }
    }

    const createBooking = (booking) => {
        dispatch(userActions.createBooking(booking));
    }

    const changeStep = (newStep) => {
        if(newStep < currentStep) {
            setState({ ...internalState, currentStep: newStep });
        }
    } 

    useEffect( () => {
        api.getSchedule(Date.now()).then( ({bookings}) => {
            console.log("RESPONSE ",bookings);
            setState({ ...internalState, bookings });
        });
    }, []);

    return (
        <div className={classes.container}>
            <h2>RESERVA UN TURNO</h2>
            <StepIndicator currentStep={currentStep} clicked={ step => changeStep(step) }></StepIndicator>
            <ViewSwitcher targetView={currentStep}>
                <ServiceTypeSelector 
                    serviceSelected={ serviceSelected => setState({ ...internalState, currentStep: 2, serviceSelected }) }
                ></ServiceTypeSelector>
                <BookingDateSelector 
                    bookings={bookings}
                    onBookingSelect={ bookingSelected => setState({ ...internalState, currentStep: 3, bookingSelected }) }
                ></BookingDateSelector>
                {/* <BookingConfirmation 
                    booking={ { date, serviceSelected } } 
                    response={ response => bookingConfirmationHandler(response) }  
                ></BookingConfirmation> */}
            </ViewSwitcher>
        </div>
    );
}

export default withStyles(styles)(BookingHandler);

