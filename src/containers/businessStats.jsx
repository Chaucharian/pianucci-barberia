import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { Tabs, Tab } from '@material-ui/core';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Spinner from '../components/spinner';
import { Chart } from "react-google-charts";

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
    data: {
        fontStyle: "normal",
        fontWeight: "lighter"
    },
    options: {
        display: "flex",
        justifyContent: "space-around",
        "& h2": {
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": {
                color: "red"
            }
        }
    },
    chart: {
        display: "flex"
    },
    selected: {
        color: "red"
    }
}

const BusinessStats = props => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const [timeRange, setTimeRange] = useState('week');
    const [bookings, bookingsFetched] = useState({});
    const [billing, billingFetched] = useState([]);
    const { fetching, currentPage } = state;
    const [currentTab, setCurrentTab] = useState(0);

    const changeTab = (event, nextTab) => setCurrentTab(nextTab);

    const getTabName = currentTab => currentTab === 0 ? 'Mony' : 'Cortes'
    
    const changeView = view => setView(view);

    const showChart = () => {
        let chart = <></>;

        if(timeRange === 'week') {
            console.log('data', billing);
            chart = 
            <Chart
                width='100%'
                height={300}
                chartType="ColumnChart"
                loader={<div>Cargando grafico</div>}
                data={[
                ['Dia', getTabName(currentTab)],
                billing
                ]}
                options={{
                hAxis: { textStyle: { fontWeight: "bold",fill: "white"} }, 
                // title: 'Population of Largest U.S. Cities',
                chartArea: { width: '60%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0,
                },
                // vAxis: {
                //     title: 'City',
                // },
                backgroundColor: 'black'
                }}
                legendToggle
            />
            ;
        } else if(timeRange === 'month') {
          
        } else if(timeRange === 'year') {
        
        }
        return chart;
    }

    useEffect( () => {
        if(currentPage === 4) {
            dispatch(appActions.fetching(true));
            api.getBusinessStats({ timeRange, filterBy: currentTab === 0 ? 'mony' : 'cuts' }).then( ({ stats }) => {
                const { bookings, billing } = stats;
                bookingsFetched(bookings);
                billingFetched(billing);
                dispatch(appActions.fetching(false));
            });
        }
    }, [currentTab, timeRange]); 

    return (
        <div className={classes.container}>
            <h1>ESTADISTICAS</h1>
            <Tabs value={currentTab} onChange={changeTab} >
                <Tab label="MONY" />
                <Tab label="CORTES" />
            </Tabs>
            <div className={classes.options} >
                <h2 className={timeRange === 'week' && classes.selected} onClick={() => setTimeRange('week')}>SEMANA</h2>
                <h2 className={timeRange === 'month' && classes.selected} onClick={() => setTimeRange('month')}>MES</h2>
                <h2 className={timeRange === 'year' && classes.selected} onClick={() => setTimeRange('year')}>AÑO</h2>
            </div>
            <Spinner loading={fetching}>
                <div className={classes.chart}>
                { showChart() }
                </div>
            </Spinner>
        </div>
    );  
  }
  

export default withStyles(styles)(BusinessStats);