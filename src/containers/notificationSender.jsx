import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import * as api from "../services/api";
import * as appActions from "../actions/app";
import Spinner from "../components/spinner";

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
  content: {
    display: "flex",
    justifyContent: "center",
    padding: "15px",
  },
};

const NotificationSender = (props) => {
  const { classes } = props;

  useEffect(() => {}, []);

  return (
    <div className={classes.container}>
      <h1>ENVIAR NOTIFICACIONES</h1>
    </div>
  );
};

export default withStyles(styles)(NotificationSender);
