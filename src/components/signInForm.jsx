import React from 'react';
import { withStyles } from '@material-ui/styles';
import WhiteTextField from './textField'; 
import ReflectButton from './reflectButton';

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    }
}

const SignInForm = (props) => {
    const { classes, onAction } = props; 
    let user = { name: '', email: '', password: '' };
    const setName = value => user.name = value;
    const setEmail = value => user.email = value;
    const setPassword = value => user.password = value;
    const newUser= () => onAction(user);

    return (
        <div className={classes.container}>
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
            label="Contraseña"
            margin="normal"
            onChange={ event => setPassword(event.target.value)}
            />
            <ReflectButton text="Registrarte" icon={<i className="fa fa-instagram"></i>} clicked={ () => newUser() }></ReflectButton>
        </div>
    );
}

export default withStyles(styles)(SignInForm);


