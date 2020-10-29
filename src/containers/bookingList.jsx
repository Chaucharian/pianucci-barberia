import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'

import { useStateValue, useSelector, selectUser } from '../context/'
import * as api from '../services/api'
import * as appActions from '../actions/app'
import RealBarberButton from '../components/realBarberButton'
import UserBooking from '../components/userBooking'

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        textAlign: 'center',
        paddingTop: '76px',
        color: '#FFF',
        '& h2': {
            fontWeight: 'lighter',
        },
    },
    bookingListContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'calc(100vh / 2)',
        margin: '10px',
    },
    bookingButton: {
        display: 'flex',
        justifyContent: 'center',
    },
}

const BookingList = (props) => {
    const { classes, onAction } = props
    const [state, dispatch] = useStateValue()
    const [refreshList, setRefreshList] = useState(false)
    const { currentPage } = state
    const { id: userId, bookings } = useSelector(selectUser)
    const bookBooking = () => onAction('bookingHandler')

    const hasBookings = () => bookings.length > 0

    const normalizeInfo = (booking, index) =>
        booking.type === 'VIP' ? (
            <h2 key={index}>
                Se comunicaran contigo para coordinar tu visita <br></br>
                &#x1F44C;{' '}
            </h2>
        ) : (
            <UserBooking
                key={index}
                booking={booking}
                onDelete={deleteBookingHandler}
            />
        )

    const showBookings = () =>
        hasBookings()
            ? bookings.map((booking, index) => normalizeInfo(booking, index))
            : false

    const deleteBookingHandler = ({ id }) => {
        api.deleteBooking(id).then(() => setRefreshList(true))
    }

    useEffect(() => {
        if (refreshList || currentPage === 1) {
            api.getUserBookings(userId).then((response) => {
                dispatch(appActions.bookingsFetched(response.bookings))
                setRefreshList(false)
            })
        }
    }, [refreshList, currentPage])

    return (
        <div className={classes.container}>
            <h1>TUS TURNOS</h1>
            <div className={classes.bookingListContainer}>
                {showBookings() || <h2>No hay reservas</h2>}
            </div>
            <div className={classes.bookingButton}>
                <RealBarberButton
                    text={'reservar turno'}
                    disabled={hasBookings()}
                    clicked={() => bookBooking()}
                ></RealBarberButton>
            </div>
        </div>
    )
}

export default withStyles(styles)(BookingList)
