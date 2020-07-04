import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { getHours } from 'date-fns';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Select from '../components/select';
import ReflectButton from '../components/reflectButton';

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
        marginTop: "20%"
    }
}

const ScheduleHandler = props => {
    const { classes } = props;
    const [morningSchedule, setMorningSchedule] = useState({ from: '', to: ''});
    const [afternoonSchedule, setAfternoonSchedule] = useState({ from: '', to: ''});
    const { from: morningFrom, to: morningTo } = morningSchedule;
    const { from: afternoonFrom, to: afternoonTo } = afternoonSchedule;
    const defaultMorningTimeRange = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00"];
    const defaultAfternoonTimeRange = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

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

        api.setAvailableHours({ morning: morningTimeToUnix, afternoon: afternoonTimeToUnix }).then( data => console.log (data));
    }

    useEffect( () => {
        api.getAvailableHours().then( ({ morning, afternoon }) => {
            setMorningSchedule({ from: getHours(morning.from)+":00", to: getHours(morning.to)+":00" });
            setAfternoonSchedule({ from: getHours(afternoon.from)+":00", to: getHours(afternoon.to)+":00" });
        });
    }, []);

    return (
        <div className={classes.container}>
            <h1>HORARIOS</h1>
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
                <ReflectButton text="GUARDAR" clicked={submit}/>
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(ScheduleHandler);
