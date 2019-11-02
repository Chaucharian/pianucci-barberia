import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import * as firebase from "firebase/app";
import "firebase/auth";
import { enviroment } from '../enviroment';
import * as appActions from '../actions/app';
import { useRedirect, navigate } from 'hookrouter';

import ReflectButton from '../components/reflectButton';
import RealBarberButton from '../components/realBarberButton';
import WhiteTextField from '../components/textField';


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
    const [state, dispatch] = useStateValue();

    firebase.initializeApp(firebaseConfig);
    // firebase.auth().signOut().then(function() {
    //     // Sign-out successful.
    //   }).catch(function(error) {
    //     // An error happened.
    //   });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            navigate('/');
        }
    });

    const logginWithInstagram = () => {
        window.open(enviroment.baseUrl+ '/instagram', 'firebaseAuth', 'height=315,width=400');
    }

    const createUserWithEmail = user => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( response => console.log(response)
        )
        .catch(function(error) {
            
        });
    }

    const loginWithEmail = () => {
        firebase.auth().signInWithEmailAndPassword('chaucharian@gmail.com', '123.ea')
        .then( response => {
            let user = { id: '', bookings: [] };
            const { email, uid } = response.user;
            // retrieve user related data from db
            firebase.database().ref('/users/' + uid).once('value').then( (snapshot) => {
                user.bookings = snapshot.bookings | [];
                user.email = email;
                user.id = uid;

                dispatch( appActions.userLoggedIn(user) );
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
        

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <div className={classes.loginContainer}>
            <WhiteTextField
                id="standard-basic"
                className={classes.textField}
                label="Standard"
                margin="normal"
                />
                <ReflectButton text="Ingresar con Instagram" icon={<i className="fa fa-instagram"></i>} clicked={ () => logginWithInstagram() }></ReflectButton>
                <RealBarberButton text="RESERVAR TURNO" clicked={() => loginWithEmail()}></RealBarberButton>
            </div>
            <div className={classes.signUpContainer}>
                <WhiteTextField
                id="standard-basic"
                className={classes.textField}
                label="Standard"
                margin="normal"
                />
            </div>
        </div>
    );
};

export default withStyles(styles)(Login);