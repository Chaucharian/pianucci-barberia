import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import * as firebase from "firebase/app";
import "firebase/auth";
import ReflectButton from '../components/reflectButton';
import RealBarberButton from '../components/realBarberButton';
import { enviroment } from '../enviroment';

const firebaseConfig = {
    apiKey: "AIzaSyD2y6eJmIuI-aT0muEMFtURhsXSev0HLhA",
    authDomain: "pianucci-barberia.firebaseapp.com",
    databaseURL: "https://pianucci-barberia.firebaseio.com",
    projectId: "pianucci-barberia",
    storageBucket: "pianucci-barberia.appspot.com",
    messagingSenderId: "276894270634",
    appId: "1:276894270634:web:663b249fd6a3c0e5827cd3",
    measurementId: "G-3BBYNVTEQR"
};

const styles = {
    login: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gridTemplateRows: "repeat(4, 100px)",
        backgroundColor: "#000",
        textAlign: "center"
    },
    title: {
        width: "1fr",
        fontFamily: "'Alegreya Sans SC', sans-serif",
        color: "#FFF"
    }
}

const Login = (props) => {
    const { classes } = props;
    firebase.initializeApp(firebaseConfig);

    const logginWithInstagram = () => {
        window.open(enviroment.baseUrl+ '/instagram', 'firebaseAuth', 'height=315,width=400');
    }

    const loginWithEmail = () => {
        firebase.auth().createUserWithEmailAndPassword('asas@asds.com', 'asdasdas').catch(function(error) {
            
        });
    }

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReflectButton text="Ingresar con Instagram" icon={<i className="fa fa-instagram"></i>} clicked={ () => logginWithInstagram() }></ReflectButton>
            <RealBarberButton text="RESERVAR TURNO" clicked={() => loginWithEmail()}></RealBarberButton>
        </div>
    );
};

export default withStyles(styles)(Login);