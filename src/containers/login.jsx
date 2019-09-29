import React from 'react';
import { withStyles} from '@material-ui/styles';
import { useStateValue } from '../state/rootState';
import AnimatedButton from '../components/animatedButton';

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
    return (
        <div className={classes.login}>
            <h1 className={classes.title}>Pianucci Barberia</h1>
            <AnimatedButton text={"Login"}></AnimatedButton>
            <AnimatedButton text={"Iniciar sessión"}></AnimatedButton>
            <AnimatedButton text={"Salir"}></AnimatedButton>
            <AnimatedButton text={"RESERVAR TURNO"} strong={true}></AnimatedButton>
        </div>
    );
};

export default withStyles(styles)(Login);