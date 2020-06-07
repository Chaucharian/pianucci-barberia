import React, { useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import * as api from '../services/api';
import * as appActions from '../actions/app';
import Select from '../components/select';
import ReflectButton from '../components/reflectButton';
import { isMonday, isFriday, isSunday, isWednesday, isThursday, isSaturday, isTuesday, setDay } from 'date-fns/esm';
import DayOffItem from '../components/dayOffItem';

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

const DaysOff = props => {
    const { classes } = props;
    const [newDayOff, setNewDayOff] = useState('');
    const [daysOff, setDaysOff] = useState([]);
    const defaultDaysSelection = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    const fromNameDayToNumber = dayName => {
        let numberDay = 0;
        switch(dayName) {
            case dayName === 'Domingo':
                numberDay = 0;
            break;
            case dayName === 'Lunes':
                numberDay = 1;
            break;
            case dayName === 'Martes':
                numberDay = 2;
            break;
            case dayName === 'Miercoles':
                numberDay = 3;
            break;
            case dayName === 'Jueves':
                numberDay = 4;
            break;
            case dayName === 'Viernes':
                numberDay = 5;
            break;
            case dayName === 'Sabado':
                numberDay = 6;
            break;
        }
        return numberDay;
    }

    const fromNumberToNameDay = dayNumber => {
        let nameDay = ''
        switch(dayNumber) {
            case 0:
                nameDay = 'Domingo';
            break;
            case 1:
                nameDay = 'Lunes';
            break;
            case 2:
                nameDay = 'Martes';
            break;
            case 3:
                nameDay = 'Miercoles';
            break;
            case 4:
                nameDay = 'Jueves';
            break;
            case 5:
                nameDay = 'Viernes';
            break;
            case 6:
                nameDay = 'Sabado';
            break;
        }
        return nameDay;
    }

    const selectDay = (day) => {
        console.log(day)
    }

    const deleteDay = day => setDaysOff(daysOff.filter( dayOff => dayOff !== day ));

    const submit = () => {
        api.setDaysOff().then( ({ days }) => {
            setDaysOff(days);
        });
    }

    useEffect( () => {
        api.getDaysOff().then( ({ days }) => {
            const daysNumberToNames = days.map( day => fromNumberToNameDay(day));
            setDaysOff(daysNumberToNames);
        });
    }, []);

    return (
        <div className={classes.container}>
            <h1>DIAS CHILL</h1>
            <div className={classes.morningSchedule}>
                { daysOff.map( (nameDay, index) => <DayOffItem key={index} nameDay={nameDay} onDelete={deleteDay} />) }
                <div className={classes.timeRange}>
                    <Select label="Dia libre" selection={newDayOff} onChange={selectDay}> 
                        {defaultDaysSelection}
                    </Select>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <ReflectButton text="GUARDAR" clicked={submit}/>
            </div>
        </div>
    );  
  }
  

export default withStyles(styles)(DaysOff);