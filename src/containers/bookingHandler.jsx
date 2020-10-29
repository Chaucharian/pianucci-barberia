import React, { useState, useEffect } from 'react'
import { useStateValue, useSelector, selectUser } from '../context'
import { withStyles } from '@material-ui/styles'
import StepIndicator from '../components/stepIndicator'
import ViewSwitcher from '../components/viewSwitcher'
import ServiceTypeSelector from '../components/serviceTypeSelector'
import BookingConfirmation from '../components/bookingConfirmation'
import BookingDateSelector from '../components/bookingDateSelector'
import VipDescriptionBooking from '../components/vipDescriptionBooking'
import * as api from '../services/api'

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        textAlign: 'center',
        paddingTop: '76px',
        color: '#FFF',
    },
    content: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}

export const BookingHandler = (props) => {
    const { classes, onDisableScroll, onGoUp } = props
    const [internalState, setState] = useState({
        currentStep: 1,
        serviceSelected: '',
        bookingSelected: {},
        confirmBookingCreation: false,
    })
    const [state, dispatch] = useStateValue()
    const user = useSelector(selectUser)
    const {
        currentStep,
        serviceSelected,
        bookingSelected,
        confirmBookingCreation,
    } = internalState

    const submitBooking = (response) => {
        if (response === 'confirm') {
            setState({ ...internalState, confirmBookingCreation: true })
        } else {
            setState({
                serviceSelected: '',
                currentStep: 1,
                bookingSelected: {},
            })
        }
    }

    const selectService = (service) =>
        setState({ ...internalState, serviceSelected: service, currentStep: 2 })

    const selectBooking = (bookingSelected) =>
        setState({ ...internalState, currentStep: 3, bookingSelected })

    const vipConfirmation = () =>
        setState({
            ...internalState,
            currentStep: 3,
            bookingSelected: { date: 'A confirmar' },
        })

    const changeStep = (newStep) => {
        if (newStep < currentStep) {
            setState({ ...internalState, currentStep: newStep })
        }
    }

    const viewBasedOnServiceSelected = () =>
        serviceSelected.name === 'VIP' ? (
            <VipDescriptionBooking onConfirm={vipConfirmation} />
        ) : (
            <BookingDateSelector onBookingSelect={selectBooking} />
        )

    useEffect(() => {
        if (confirmBookingCreation) {
            const requestPayload = {
                userId: user.id,
                type: serviceSelected.name,
                duration: serviceSelected.duration,
                date:
                    bookingSelected.date === 'A confirmar'
                        ? 0
                        : bookingSelected.date,
            }
            api.createBooking(requestPayload).then((response) => {
                onGoUp()
            })
        }
    }, [confirmBookingCreation])

    useEffect(() => {
        if (currentStep === 2) {
            onDisableScroll(true)
        } else {
            onDisableScroll(false)
        }
    }, [currentStep])

    return (
        <div className={classes.container}>
            <h2>RESERVA UN TURNO</h2>
            <StepIndicator
                currentStep={currentStep}
                clicked={changeStep}
            ></StepIndicator>
            <ViewSwitcher targetView={currentStep}>
                <ServiceTypeSelector onServiceSelected={selectService} />
                {viewBasedOnServiceSelected()}
                <BookingConfirmation
                    bookingSelected={bookingSelected}
                    serviceSelected={serviceSelected}
                    onSubmit={submitBooking}
                />
            </ViewSwitcher>
        </div>
    )
}

export default withStyles(styles)(BookingHandler)
