import React, { useRef, useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useStateValue } from "../state/rootState";
import * as api from "../services/api";
import * as appActions from "../actions/app";
import ClientBookingItem from "../components/clientBookingItem";
import DaysListSelector from "../components/daysListSelector";
import Spinner from "../components/spinner";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#000",
    textAlign: "center",
    paddingTop: "76px",
    color: "#FFF",
    "& h1": {
      marginBottom: "0px",
    },
  },
  bookingListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "60%",
    overflow: "auto",
    padding: "10px",
  },
  daySelector: {
    display: "flex",
    justifyContent: "center",
  },
};

const BookingAdminList = (props) => {
  const { classes, onDisableScroll } = props;
  const [state, dispatch] = useStateValue();
  const [refreshList, setRefreshList] = useState(false);
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [showBookings, setShowBookings] = useState(true);
  const {
    user: { bookings, daysOff },
    fetching,
    currentPage,
  } = state;

  const hasBookings = () => bookings.length > 0;

  const payBooking = (payload) => {
    api.payBooking(payload).then(() => setRefreshList(true));
  };

  const openCalendar = (defaultDate) => {
    setCurrentDate(defaultDate);
    setShowBookings(false);
  };

  const changeDay = ({ date, showBookings }) => {
    setCurrentDate(date);
    setShowBookings(showBookings);
  };

  useEffect(() => {
    if (currentDate || refreshList || currentPage === 2) {
      dispatch(appActions.fetching(true));
      api.getAllBookingsByDate(currentDate).then(({ bookings }) => {
        dispatch(appActions.fetching(false));
        dispatch(appActions.bookingsFetched(bookings));
        setRefreshList(false);
      });
    }
  }, [currentDate, refreshList, currentPage]);

  return (
    <div className={classes.container}>
      <h1>TUS TURNOS</h1>
      <div className={classes.daySelector}>
        <DaysListSelector
          date={currentDate}
          showBookings={showBookings}
          daysOff={daysOff}
          onDaySelected={changeDay}
          onOpenCalendar={openCalendar}
        />
      </div>
      <div
        className={classes.bookingListContainer}
        onScroll={() => onDisableScroll(true)}
      >
        <Spinner loading={fetching && showBookings}>
          {showBookings &&
            (hasBookings() ? (
              bookings.map((booking, index) => (
                <ClientBookingItem
                  key={index}
                  booking={booking}
                  isAdmin={true}
                  onPay={payBooking}
                />
              ))
            ) : (
              <h2>No hay turnos para la fecha seleccionada</h2>
            ))}
        </Spinner>
      </div>
    </div>
  );
};

export default withStyles(styles)(BookingAdminList);
