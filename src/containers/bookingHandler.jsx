import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import { withStyles } from '@material-ui/styles';
import StepIndicator from '../components/stepIndicator';
import ViewSwitcher from '../components/viewSwitcher';
import ServiceTypeSelector from '../components/serviceTypeSelector';
import BookingConfirmation from '../components/bookingConfirmation';
import BookingDateSelector from '../components/bookingDateSelector';
import * as userActions from '../actions/user';
import * as api from '../services/api';

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

export const BookingHandler = (props) => {
    const { classes, onChangeScrollStatus } = props; 
    const [internalState, setState] = useState({currentStep: 1, serviceSelected: '', bookingSelected: {}, confirmBookingCreation: false });
    const [state, dispatch] = useStateValue();
    const { user } = state;
    const { currentStep, serviceSelected, bookingSelected, confirmBookingCreation } = internalState;
    console.log(" USER ",user);
    const bookingConfirmationHandler = response => {
        if (response === 'confirm') {
            setState({ ...internalState, confirmBookingCreation: true });
        } else {
            setState({ serviceSelected: '', currentStep: 1, bookingSelected: {} });
        }
    }

    // const createBooking = booking => dispatch(userActions.createBooking(booking));

    const selectService = service => {
        setState({ ...internalState, serviceSelected: service, currentStep: 2 });
    }

    const changeStep = (newStep) => {
        if(newStep < currentStep) {
            setState({ ...internalState, currentStep: newStep });
        } 
        if(newStep === 2) {
            onChangeScrollStatus(false);
        } else {
            onChangeScrollStatus(true);
        }
    } 

    useEffect( () => {
        if(confirmBookingCreation) {
            const requestPayload = {

            };
            api.createBooking(bookingSelected).then( AuthenticatorAssertionResponse => {
                console.log(" RESPONSE ",response);
            })
        }
    }, [confirmBookingCreation]);

    return (
        <div className={classes.container}>
            <h2>RESERVA UN TURNO</h2>
            <StepIndicator currentStep={currentStep} clicked={changeStep}></StepIndicator>
            <ViewSwitcher targetView={currentStep}>
                <ServiceTypeSelector 
                    serviceSelected={selectService}
                ></ServiceTypeSelector>
                <BookingDateSelector 
                    onBookingSelect={ bookingSelected => {
                        console.log(" BOOKING SELECTED ",bookingSelected)
                        setState({ ...internalState, currentStep: 3, bookingSelected });
                    }}
                ></BookingDateSelector>
                <BookingConfirmation 
                    bookingSelected={bookingSelected} 
                    serviceSelected={serviceSelected}
                    response={ response => bookingConfirmationHandler(response) }  
                ></BookingConfirmation>
            </ViewSwitcher>
        </div>
    );
}

export default withStyles(styles)(BookingHandler);

