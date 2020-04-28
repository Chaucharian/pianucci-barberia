import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'
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
            color: "red !important"
        },
        "& div:before": {
            borderBottomColor: "red !important"
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
    const { classes, onSubmit, formErrors } = props; 
    const { register, handleSubmit, setError, errors } = useForm();
   
    useEffect( () => {
        formErrors.map( field => {
            field === 'signInemail' && setError('email','notMatch');
        });
    }, [formErrors]);

    return (
        <div className={classes.centerContainer}>
            <div className={classes.contentContainer}>
                <div className={classes.formContainer}>
                    <form
                        className={classes.formContainer} 
                        onSubmit={handleSubmit(onSubmit)}
                    >                      
                        <WhiteTextField
                            id="standard-basic"
                            className={classes.textField}
                            inputRef={register({ required: true })}
                            classes={ { root: errors.name ? classes.fieldError : '' } }
                            name="name"
                            label="Nombre"
                            margin="normal"
                        />
                        <WhiteTextField
                            id="standard-basic"
                            className={classes.textField}
                            inputRef={register({ 
                                required: true,   
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                } 
                            }) }
                            classes={ { root: errors.email ? classes.fieldError : '' } }
                            name="email"
                            label="Email"
                            margin="normal"
                        />
                        <WhiteTextField
                            id="standard-basic"
                            className={classes.textField}
                            inputRef={register({ required: true })}
                            classes={ { root: errors.phone ? classes.fieldError : '' } }
                            name="phone"
                            label="Celular"
                            margin="normal"
                            type="number"
                        />
                        <WhiteTextField
                            id="standard-basic"
                            className={classes.textField}
                            inputRef={register({ 
                                required: true,   
                                pattern: {
                                    value: /(?=.{6,})/
                                } 
                            }) }
                            classes={ { root: errors.password ? classes.fieldError : '' } }
                            name="password"
                            label="Contraseña"
                            margin="normal"
                            type="password"
                        />
                        <ReflectButton text="Registrarte" icon={<i className="fa fa-instagram"></i>} ></ReflectButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(SignInForm);


