import React, { useState, createRef } from 'react';
import { withStyles } from '@material-ui/styles';
import WhiteTextField from './textField'; 
import ReflectButton from './reflectButton';

const styles = {
    centerContainer: {
        display: "flex",
        justifyContent: "center"
    },
    contentContainer: {
        padding: "10px",
        maxWidth: "450px",
        width: "100%"
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10px",
        paddingRight: "10px",
        "& button": {
            marginTop: "60px"
        }
    },
    fieldError: {
        "& label": {
            color: "red"
        },
        "&:before": {
            borderBottomColor: "red"
        }
    },
    buttonContainer: {
        display: "block",
        width: "100px",
        margin: "0px auto",
        marginTop: "calc(100vh / 4)",
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
    const { classes, onSubmit } = props; 
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const emailField = createRef();
    const passwordField = createRef();
    
    const goToSigInView = () => onAction('changeView');
    const validateEmail = (email, callbackSuccess, callbackError) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            callbackSuccess(email);
        } else {
            callbackError(`there is and error with this email: ${email} }`);
        }
        
    }

    const submit = event => {
        const email = emailField.current.value;
        const password = passwordField.current.value;
        event.preventDefault();
        // validateEmail(event.target.value, email => setEmail(email), () => console.log("ERROR") )
        if(email !== '' && password !== '') {
            onSubmit({ email, password });
        } else if(email === '') {
            setEmailError(true);
        } else if(password === '') {
            setPasswordError(true);
        }
    }


    return (
        <div className={classes.centerContainer}>
              <div className={classes.contentContainer}>
                <div className={classes.formContainer}>
                    <form
                        className={classes.formContainer} 
                        onSubmit={ event => submit(event)}>
                        <WhiteTextField
                        id="standard-basic"
                        inputRef={emailField}
                        // classes={ { a: emailError ? classes.fieldError : '' } }
                        label="Email"
                        margin="normal"
                        type="email"
                        />
                        <WhiteTextField
                        id="standard-basic"
                        inputRef={passwordField}
                        label="Contraseña"
                        margin="normal"
                        type="password" 
                        />
                        <ReflectButton text="Iniciar Sesion" icon={<i className="fa fa-instagram"></i>}/>
                    </form> 
                </div>
                <div className={classes.buttonContainer}>
                    <label>Registrate!</label>
                    <button className={classes.nextPageButton} onClick={() => goToSigInView()}>
                        <i className="fas fa-arrow-circle-down"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(LogInForm);


