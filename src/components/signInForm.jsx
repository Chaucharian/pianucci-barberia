import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/styles";
import WhiteTextField from "./textField";
import ReflectButton from "./reflectButton";
import Spinner from "./spinner";

const styles = {
  centerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  contentContainer: {
    padding: "10px",
    maxWidth: "450px",
    width: "100%",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  fieldError: {
    "& label": {
      color: "red !important",
    },
    "& div:before": {
      borderBottomColor: "red !important",
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "10px",
    paddingRight: "10px",
    "& button": {
      marginTop: "60px",
    },
  },
  spinnerContainer: {
    paddingTop: "15px",
  },
};

const SignInForm = (props) => {
  const { classes, fetching, formErrors, onSubmit } = props;
  const { register, handleSubmit, setError, errors } = useForm();

  useEffect(() => {
    formErrors.map((field) => {
      field === "signInemail" && setError("email", "notMatch");
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
              className={classes.textField}
              inputRef={register({ required: true })}
              classes={{ root: errors.name ? classes.fieldError : "" }}
              name="name"
              label="Nombre"
              margin="normal"
            />
            <WhiteTextField
              className={classes.textField}
              inputRef={register({ required: true })}
              classes={{ root: errors.lastname ? classes.fieldError : "" }}
              name="lastname"
              label="Apellido"
              margin="normal"
            />
            <WhiteTextField
              className={classes.textField}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              })}
              classes={{ root: errors.email ? classes.fieldError : "" }}
              name="email"
              label="Email"
              margin="normal"
            />
            <WhiteTextField
              className={classes.textField}
              inputRef={register({ required: true })}
              classes={{ root: errors.phone ? classes.fieldError : "" }}
              name="phone"
              label="Celular"
              margin="normal"
              type="number"
            />
            <WhiteTextField
              className={classes.textField}
              inputRef={register({
                required: true,
                pattern: {
                  value: /(?=.{6,})/,
                },
              })}
              classes={{ root: errors.password ? classes.fieldError : "" }}
              name="password"
              label="Contraseña"
              margin="normal"
              type="password"
            />
            <ReflectButton
              text="Registrarte"
              icon={<i className="fa fa-instagram"></i>}
            ></ReflectButton>
          </form>
        </div>
        <div className={classes.spinnerContainer}>
          <Spinner loading={fetching} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignInForm);
