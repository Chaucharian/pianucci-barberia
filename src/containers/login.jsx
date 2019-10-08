import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import ReflectButton from '../components/reflectButton';
import RealBarberButton from '../components/realBarberButton';
import { enviroment } from '../enviroment';

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

const Componnent = () => {
    const [{counter}, dispatch] = useStateValue();
  
    const updateCounter = () => {
      const newCounter = counter;
      dispatch({ type: 'updateTime',counter: newCounter + 1 });
    }
  
    return (
      <button onClick={ () => updateCounter() } >{ counter }</button>
    );
  }

const Login = (props) => {
    const { classes } = props;

    const logginWithInstagram = () => {
        window.open(enviroment.baseUrl+ '/instagram', 'firebaseAuth', 'height=315,width=400');
    }

    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <ReflectButton text="Ingresar con Instagram" icon={<i className="fa fa-instagram"></i>} clicked={ () => logginWithInstagram() }></ReflectButton>
            <RealBarberButton text="RESERVAR TURNO" ></RealBarberButton>
        </div>
    );
};

export default withStyles(styles)(Login);