import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { Tabs, Tab } from '@material-ui/core';
import { useStateValue } from '../context/context';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Spinner from '../components/spinner';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css'; // Default Style
import { addDays, getDay, format } from 'date-fns';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#000',
    textAlign: 'center',
    paddingTop: '76px',
    color: '#FFF',
    '& h1': {
      marginBottom: '0px',
    },
    '& h2': {
      fontWeight: 'lighter',
    },
    '& .MuiTabs-root ': {
      '& button': {
        width: '50%',
      },
      '& .MuiTabs-indicator': {
        backgroundColor: 'white',
      },
    },
  },
  data: {
    fontStyle: 'normal',
    fontWeight: 'lighter',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-around',
    '& h2': {
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        color: 'red',
      },
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
  },
  textContainer: {
    display: 'block',
  },
  halfContent: {
    width: '50%',
  },
  selected: {
    color: 'red',
  },
  calendar: {
    overflow: 'auto',
    '& .rlc-day': {
      color: 'white',
    },
    '& .rlc-day-disabled': {
      color: '#cecece',
    },
  },
};

const days = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
};

const BusinessStats = (props) => {
  const { classes } = props;
  const [state, dispatch] = useStateValue();
  const [date, setDate] = useState();
  const [bookings, bookingsFetched] = useState({});
  const [billing, billingFetched] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const { fetching, currentPage } = state;

  const changeTab = (event, nextTab) => setCurrentTab(nextTab);

  const disableDates = (date) => date >= new Date().getTime();

  const fullDate = (date) =>
    `${days[getDay(date)]} ${format(date, 'dd/MM/yyyy')}`;

  const showView = () => {
    let view = <></>;

    if (currentTab) {
      view = (
        <>
          {date && (
            <div className={classes.textContainer}>
              <h3>{fullDate(date)}</h3>
              <h2>Cortes {bookings.selectedDate}</h2>
              <h2>Mony {billing.selectedDate}$</h2>
            </div>
          )}
          {!date && (
            <div className={classes.calendar}>
              <Calendar
                dayLabels={[
                  'Lunes',
                  'Martes',
                  'Miercoles',
                  'Jueves',
                  'Viernes',
                  'Sabado',
                  'Domingo',
                ]}
                monthLabels={[
                  'Enero',
                  'Febrero',
                  'Marzo',
                  'Abril',
                  'Mayo',
                  'Junio',
                  'Julio',
                  'Agosto',
                  'Septiembre',
                  'Octubre',
                  'Noviembre',
                  'Diciembre',
                ]}
                disableDates={(date) => disableDates(addDays(date, 1))}
                onChange={(date) => setDate(addDays(date, 1))}
              />
            </div>
          )}
        </>
      );
    } else {
      view = (
        <>
          <div>
            <h2>&#x1F5DE;</h2>
            <h3>HOY</h3>
            <h3>SEMANA</h3>
            <h3>MES</h3>
          </div>
          <div className={classes.halfContent}>
            <h2>CORTES</h2>
            <h3>{bookings.today}</h3>
            <h3>{bookings.week}</h3>
            <h3>{bookings.month}</h3>
          </div>
          <div className={classes.halfContent}>
            <h2>MONY</h2>
            <h3>{billing.today}$</h3>
            <h3>{billing.week}$</h3>
            <h3>{billing.month}$</h3>
          </div>
        </>
      );
    }

    return view;
  };

  useEffect(() => {
    if (currentPage === 4) {
      currentTab === 0 && setDate(null);
      dispatch(appActions.fetching(true));
      api
        .getBusinessStats({
          date: new Date(date).getTime(),
        })
        .then(({ stats }) => {
          const { bookings, billing } = stats;
          // always apply last state update
          bookingsFetched((state) => ({ ...state, ...bookings }));
          billingFetched((state) => ({ ...state, ...billing }));
          dispatch(appActions.fetching(false));
        });
    }
  }, [date, currentTab, currentPage]);

  return (
    <div className={classes.container}>
      <h1>ESTADISTICAS</h1>
      <Tabs value={currentTab} onChange={changeTab}>
        <Tab label="GENERAL" />
        <Tab label="POR FECHA" />
      </Tabs>
      <Spinner loading={fetching}>
        <div className={classes.content}>{showView()}</div>
      </Spinner>
    </div>
  );
};

export default withStyles(styles)(BusinessStats);
