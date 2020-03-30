import React, { createRef } from 'react';
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
    fieldError: {
        "& label": {
            color: "red"
        },
        "& :before": {
            borderBottomColor: "red"
        }
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "60px",
        paddingLeft: "10px",
        paddingRight: "10px",
        "& button": {
            marginTop: "60px"
        }
    },
}

const SignInForm = (props) => {
    const { classes, onSubmit } = props; 
    let user = { name: '', email: '', password: '', phone: 0 };
    const nameField = createRef();
    const phoneField = createRef();
    const emailField = createRef();
    const passwordField = createRef();

    const validatePassword = (password, callbackSuccess, callbackError) => {
        const strongRegex =  { test: () => password.length > 6 }; // :D new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(strongRegex.test(password)) {
            callbackSuccess(password);
        } else {
            callbackError(password);
        }
    }

    const submit = event => {
        const name = nameField.current.value;
        const email = emailField.current.value;
        const phone = phoneField.current.value;
        const password = passwordField.current.value;

        event.preventDefault();
        if(name !== '' && email !== '' && phone !== '' && password !== '') {
            onSubmit({ name, email, phone, password });
        }
    }

    return (
        <div className={classes.centerContainer}>
            <div className={classes.contentContainer}>
                <div className={classes.formContainer}>
                    <form
                        className={classes.formContainer} 
                        onSubmit={ event => submit(event)}
                    >                      
                    <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        inputRef={nameField}
                        label="Nombre"
                        margin="normal"
                    />
                    <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        inputRef={emailField}
                        label="Email"
                        margin="normal"
                    />
                    <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        inputRef={phoneField}
                        label="Celular"
                        margin="normal"
                        type="number"
                    />
                    <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        inputRef={passwordField}
                        label="Contraseña"
                        margin="normal"
                        type="password"
                        // onChange={ event => validatePassword(event.target.value, password => setPassword(password), () => console.log("PASS WEAK") )}
                    />
                    <ReflectButton text="Registrarte" icon={<i className="fa fa-instagram"></i>} ></ReflectButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(SignInForm);


