import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { Tabs, Tab } from '@material-ui/core';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Spinner from '../components/spinner';


const styles = {
    container: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        textAlign: "center",
        paddingTop: "76px",
        color: "#FFF",
        "& h1": {
            marginBottom: "0px"
        },
        "& h2": {
            fontWeight: "lighter"
        },
        "& .MuiTabs-root ": {
            "& button": {
                width: "50%"
            },
            "& .MuiTabs-indicator": {
                backgroundColor: "white"
            }
        } 
    },
    statsContainer: {
        "& ul": {
            listStyle: "none",
            textAlign: "initial"
        }
    },
    data: {
        fontStyle: "normal",
        fontWeight: "lighter"
    }
}

const BusinessStats = props => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const [currentTab, setCurrentTab] = useState(0);
    const [bookings, bookingsFetched] = useState({});
    const [billing, billingFetched] = useState({});
    const { fetching, currentPage } = state;

    const changeTab = (event, nextTab) => setCurrentTab(nextTab);

    const showStats = () => {
        let statsToShow = <></>;

        const { today: todayBookings, currentMonth: currentMonthBookings, currentWeek: currentWeekBooking } = bookings;
        const { today: todayBilling, currentMonth: currentMonthBilling, currentWeek: currentWeekBilling } = billing;
        if(currentTab === 0) {
            statsToShow = 
            <ul>
                <li>
                    <h1>HOY <i className={classes.data}>{todayBilling}$</i></h1>
                </li>
                <li>
                    <h1>SEMANA ACTUAL <i className={classes.data}>{currentWeekBilling}$</i></h1>
                </li>
                <li>
                    <h1>MES ACTUAL <i className={classes.data}>{currentMonthBilling}$</i></h1>
                </li>
            </ul>;
        } else if(currentTab === 1) {
            statsToShow = 
            <ul>
                <li>
                    <h1>HOY <i className={classes.data}>{todayBookings}</i></h1>
                </li>
                <li>
                    <h1>SEMANA ACTUAL <i className={classes.data}>{currentWeekBooking}</i></h1>
                </li>
                <li>
                    <h1>MES ACTUAL <i className={classes.data}>{currentMonthBookings}</i></h1>
                </li>
            </ul>;
        }
        return statsToShow;
    }

    useEffect( () => {
        if(currentPage === 4) {
            dispatch(appActions.fetching(true));
            api.getBusinessStats().then( ({ stats }) => {
                const { bookings, billing } = stats;
                bookingsFetched(bookings);
                billingFetched(billing);
                dispatch(appActions.fetching(false));
            });
        }
    }, [currentPage]); 

    return (
        <div className={classes.container}>
            <h1>ESTADISTICAS</h1>
            <Tabs value={currentTab} onChange={changeTab} >
                <Tab label="MONY" />
                <Tab label="CORTES" />
            </Tabs>
            <Spinner loading={fetching}>
                <div className={classes.statsContainer}>
                    { showStats() }
                </div>
            </Spinner>
        </div>
    );  
  }
  

export default withStyles(styles)(BusinessStats);