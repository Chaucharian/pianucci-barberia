import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
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
    const [state, dispatch] = useStateValue();
    const [morningSchedule, setMorningSchedule] = useState({ from: '', to: ''});
    const [afternoonSchedule, setAfternoonSchedule] = useState({ from: '', to: ''});
    const { from: morningFrom, to: morningTo } = morningSchedule;
    const { from: afternoonFrom, to: afternoonTo } = afternoonSchedule;

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

    return (
        <div className={classes.container}>
            <h1>HORARIOS</h1>
            <div>
                <h2>MAÑANA</h2>
                <div className={classes.timeRange}>
                    <Select label="Desde" selection={morningFrom} onChange={morningSelection}> 
                        {["9:00","10:00","11:00"]}
                    </Select>
                    <Select label="Hasta" selection={morningTo} onChange={morningSelection}> 
                        {["9:00","10:00","11:00"]}
                    </Select>
                </div>
            </div>
            <div>
                <h2>TARDE</h2>
                <div className={classes.timeRange}>
                    <Select label="Desde" selection={afternoonFrom} onChange={afternoonSelection}> 
                        {["9:00","10:00","11:00"]}
                    </Select>
                    <Select label="Hasta" selection={afternoonTo} onChange={afternoonSelection}> 
                        {["9:00","10:00","11:00"]}
                    </Select>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <ReflectButton text="GUARDAR"/>
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(ScheduleHandler);