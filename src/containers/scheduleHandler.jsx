import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { getHours } from 'date-fns';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Select from '../components/select';
import ReflectButton from '../components/reflectButton';
import { Tabs, Tab } from '@material-ui/core';
import Spinner from '../components/spinner';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css' // Default Style
import  { addDays, isToday, isTomorrow, format } from 'date-fns';
import { START_DATE, END_DATE, dateToUnix, isDateDisabled } from '../utils/dates';

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
    scheduleContainer: {
        width: "100%",
        height: "100vh", 
        backgroundColor: "#000",
        paddingTop: "10px",
        textAlign: "center",
        color: "#FFF",
        "& h1": {
            marginBottom: "0px"
        },
        "& h2": {
            fontWeight: "lighter"
        }
    },
    morningSchedule: {
        marginBottom: "60px"
    },
    timeRange: {
        display: "flex"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    calendar: {
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        "& .rlc-day": {
            color: "white"
        },
        "& .rlc-day-disabled": {
            color: "#cecece"
        }
    },
    showCalendarText: {
        cursor: "pointer",
        transition: "all 200ms ease",
        "&:hover": {
            color: "red"
        }
    },
    dateIndicator: {
        color: "red"
    }
}

const ScheduleHandler = props => {
    const { classes } = props;
    const [state, dispatch] = useStateValue();
    const [morningSchedule, setMorningSchedule] = useState({ from: '', to: ''});
    const [afternoonSchedule, setAfternoonSchedule] = useState({ from: '', to: ''});
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentDateFormated, setCurrentDateFormated] = useState(null);
    const { fetching, currentPage, user: { daysOff } } = state;
    const { from: morningFrom, to: morningTo } = morningSchedule;
    const { from: afternoonFrom, to: afternoonTo } = afternoonSchedule;
    const defaultMorningTimeRange = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00"];
    const defaultAfternoonTimeRange = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

    const disableDates = date => date < new Date().getTime() || date > END_DATE || date < START_DATE || isDateDisabled(daysOff, date);

    const changeTab = (event, nextTab) => {
        if(nextTab === 0) setCurrentDate(null); // set to initial state
        setCurrentTab(nextTab);
    }

    const daySelection = (date, calendarSelection = false) => {
        const unixDate = dateToUnix(date);
        const dateFormated = format(date,"dd/MM/yyyy");
        setShowCalendar(false);
        setCurrentDate(unixDate);
        setCurrentDateFormated(dateFormated);
    }

    const morningSelection = (label, time) => {
        if(label === 'Desde') {
            setMorningSchedule({ ...morningSchedule, from: time });
        } else {
            setMorningSchedule({ ...morningSchedule, to: time });
        }
    }
   
    const afternoonSelection = (label, time) => {
        if(label === 'Desde') {
            setAfternoonSchedule({ ...afternoonSchedule, from: time });
        } else {
            setAfternoonSchedule({ ...afternoonSchedule, to: time });
        }
    }

    const submit = () => {
        const morningTimeToUnix = { from: new Date().setHours(Number(morningFrom.split(":")[0]), 0), to: new Date().setHours(Number(morningTo.split(":")[0]), 0) };
        const afternoonTimeToUnix = { from: new Date().setHours(Number(afternoonFrom.split(":")[0]), 0), to: new Date().setHours(Number(afternoonTo.split(":")[0]), 0) };

        api.setAvailableHours({ morning: morningTimeToUnix, afternoon: afternoonTimeToUnix, requestDate: currentDate }).then( data => console.log (data));
    }

    const showView = () => {
        let viewToShow = <></>;
        if(currentTab === 0) {
            viewToShow = 
                <div className={classes.scheduleContainer}>
                    <div className={classes.morningSchedule}>
                        <h2>MAÑANA</h2>
                        <div className={classes.timeRange}>
                            <Select label="Desde" selection={morningFrom} onChange={morningSelection}>
                                {defaultMorningTimeRange}
                            </Select>
                            <Select label="Hasta" selection={morningTo} onChange={morningSelection}>
                                {defaultMorningTimeRange}
                            </Select>
                        </div>
                    </div>
                    <div>
                        <h2>TARDE</h2>
                        <div className={classes.timeRange}>
                            <Select label="Desde" selection={afternoonFrom} onChange={afternoonSelection}>
                                {defaultAfternoonTimeRange}
                            </Select>
                            <Select label="Hasta" selection={afternoonTo} onChange={afternoonSelection}>
                                {defaultAfternoonTimeRange}
                            </Select>
                        </div>
                    </div>
                    <div className={classes.buttonContainer}>
                        <ReflectButton text="GUARDAR" clicked={submit} />
                    </div>
                </div>;
        } else {
            viewToShow =
                <div className={classes.scheduleContainer}>
                    <h2 className={classes.showCalendarText} onClick={() => setShowCalendar(!showCalendar)} >SELECCIONAR FECHA</h2>
                    { (!showCalendar && currentDateFormated) && <h3 className={classes.dateIndicator}>HORARIOS PARA {currentDateFormated}</h3> }
                    { showCalendar && 
                    <div className={classes.calendar}>
                        <Calendar 
                        dayLabels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
                        monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                        disableDates={ date => disableDates(addDays(date, 1)) }
                        onChange={ date => daySelection(addDays(date, 1), true) }
                        />
                    </div> }
                    { !showCalendar && 
                    <>
                        <div className={classes.morningSchedule}>
                            <h2>MAÑANA</h2>
                            <div className={classes.timeRange}>
                                <Select label="Desde" selection={morningFrom} onChange={morningSelection}>
                                    {defaultMorningTimeRange}
                                </Select>
                                <Select label="Hasta" selection={morningTo} onChange={morningSelection}>
                                    {defaultMorningTimeRange}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <h2>TARDE</h2>
                            <div className={classes.timeRange}>
                                <Select label="Desde" selection={afternoonFrom} onChange={afternoonSelection}>
                                    {defaultAfternoonTimeRange}
                                </Select>
                                <Select label="Hasta" selection={afternoonTo} onChange={afternoonSelection}>
                                    {defaultAfternoonTimeRange}
                                </Select>
                            </div>
                        </div>
                        <div className={classes.buttonContainer}>
                        <ReflectButton text="GUARDAR" clicked={submit} />
                    </div>
                    </>
                    }   
                </div>;
        }
        return viewToShow;
    }

    useEffect( () => {
        api.getAvailableHours(currentDate).then( ({ morning, afternoon }) => {
            setMorningSchedule({ from: getHours(morning.from)+":00", to: getHours(morning.to)+":00" });
            setAfternoonSchedule({ from: getHours(afternoon.from)+":00", to: getHours(afternoon.to)+":00" });
        });
    }, [currentDate]);

    return (
        <div className={classes.container}>
            <h1>HORARIOS</h1>
            <Tabs value={currentTab} onChange={changeTab} >
                <Tab label="DIARIO" />
                <Tab label="POR FECHA" />
            </Tabs>
            <Spinner loading={fetching}>
                { showView() }
            </Spinner>
        </div>
    );  
  }
  

export default withStyles(styles)(ScheduleHandler);