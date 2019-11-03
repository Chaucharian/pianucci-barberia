import React from 'react';
import { withStyles } from '@material-ui/styles';
import WhiteTextField from './textField'; 
import ReflectButton from './reflectButton';

const styles = {
    container: {
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    buttonContainer: {
        position: "fixed",
        top: "65%",
        left: "40%",
        display: "block",
        width: "100px",
        "& label": {
            fontFamily: "Alegreya Sans SC",
            fontSize: "20px",
            "&:hover": {
                paddingTop: "10px"
            }
        }
    },
    nextPageButton: {
        color: "#FFF",
        fontSize: "40px",
        border: "none",
        outline: "0px",
        background: "transparent",
        transition: "1s all ease-in-out",

        "&:hover": {
            color: "#000",
        }
    }
}

const LogInForm = (props) => {
    const { classes, onAction } = props; 
    let user = { email: '', password: '' };
    const setEmail = value => user.email = value;
    const setPassword = value => user.password = value;
    const newUser = () => onAction(user);
    const goToSigInView = () => onAction('changeView');
    const validateEmail = (email, callbackSuccess, callbackError) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            callbackSuccess(email);
        } else {
            callbackError(email);
        }
        
    }

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <WhiteTextField
                id="standard-basic"
                className={classes.textField}
                label="Email"
                margin="normal"
                onChange={ event => validateEmail(event.target.value, email => setEmail(email), () => console.log("ERROr") ) }
                />
                <WhiteTextField
                id="standard-basic"
                className={classes.textField}
                label="Contraseña"
                margin="normal"
                onChange={ event => setPassword(event.target.value)}
                />
                <ReflectButton text="Iniciar Sesion" icon={<i className="fa fa-instagram"></i>} clicked={ () => newUser() }></ReflectButton>
            </div>
            <div className={classes.buttonContainer}>
                <label>Registrate!</label>
                <button className={classes.nextPageButton} onClick={() => goToSigInView()}>
                    <i className="fas fa-arrow-circle-down"></i>
                </button>
            </div>
        </div>
    );
}

export default withStyles(styles)(LogInForm);


