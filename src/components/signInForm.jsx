import React from 'react';
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
        marginBottom: "60px",
        paddingLeft: "10px",
        paddingRight: "10px",
        "& button": {
            marginTop: "60px"
        }
    },
}

const SignInForm = (props) => {
    const { classes, onAction } = props; 
    let user = { name: '', email: '', password: '', phone: 0 };
    const setName = value => user.name = value;
    const setEmail = value => user.email = value;
    const setPassword = value => user.password = value;
    const setPhone = value => user.phone = value;
    const newUser= () => onAction(user);

    const validatePassword = (password, callbackSuccess, callbackError) => {
        const strongRegex =  { test: () => password.length > 6 }; // :D new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(strongRegex.test(password)) {
            callbackSuccess(password);
        } else {
            callbackError(password);
        }
    }

    return (
        <div className={classes.centerContainer}>
            <div className={classes.contentContainer}>
                <div className={classes.formContainer}>
                    <form
                            className={classes.formContainer} 
                            onSubmit={ event => {
                                newUser();
                                event.preventDefault();
                        }}>                      
                    <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        label="Nombre"
                        margin="normal"
                        onChange={ event => setName(event.target.value)}
                        />
                        <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        label="Email"
                        margin="normal"
                        onChange={ event => setEmail(event.target.value)}
                        />
                        <WhiteTextField
                            id="standard-basic"
                            className={classes.textField}
                            label="Celular"
                            margin="normal"
                            type="number"
                            onChange={event => setPhone(event.target.value)}
                        />
                        <WhiteTextField
                        id="standard-basic"
                        className={classes.textField}
                        label="Contraseña"
                        margin="normal"
                        type="password"
                        onChange={ event => validatePassword(event.target.value, password => setPassword(password), () => console.log("PASS WEAK") )}
                        />
                        <ReflectButton text="Registrarte" icon={<i className="fa fa-instagram"></i>} ></ReflectButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(SignInForm);


