import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import * as api from "../services/api";
import ReflectButton from "../components/reflectButton";
import WhiteTextField from "../components/textField";
import { useForm } from "react-hook-form";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#000",
    textAlign: "center",
    paddingTop: "76px",
    color: "#FFF",
    "& h1": {
      marginBottom: "0px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20%",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "60%0",
  },
  errorMessage: {
    color: "red",
  },
  fieldError: {
    "& label": {
      color: "red !important",
    },
    "& div:before": {
      borderBottomColor: "red !important",
    },
  },
};

const NotificationSender = (props) => {
  const { classes } = props;
  const [error, setErrorMessage] = useState(null); //working on cleaning up error when its resolve
  const { register, handleSubmit, setError, errors } = useForm();

  const onSubmit = (data, form) =>
    api
      .sendNotification(data)
      .then(() => {
        form.target.reset();
      })
      .catch((error) => {
        setError("message");
      });

  useEffect(() => {}, []);

  return (
    <div className={classes.container}>
      <h1>ENVIAR NOTIFICACIONES</h1>
      <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <WhiteTextField
          inputRef={register({
            required: true,
          })}
          classes={{ root: errors.message ? classes.fieldError : "" }}
          name="message"
          label="Escribe un mensaje"
          margin="normal"
          type="text"
        />
        {error && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.buttonContainer}>
          <ReflectButton text="ENVIAR A TODOS" />
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(NotificationSender);
