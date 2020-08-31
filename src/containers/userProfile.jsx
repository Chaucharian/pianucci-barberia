import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStateValue } from "../context/context";

const styles = {
  container: {
    paddingTop: "76px",
    "& ul": {
      listStyle: "none",
      fontSize: "15px",
    },
  },
  userData: {
    fontStyle: "normal",
    fontWeight: "lighter",
  },
};

const UserProfile = (props) => {
  const { classes } = props;
  const [state, dispatch] = useStateValue();
  const {
    user: { name, lastname, email, phone },
  } = state;

  return (
    <div className={classes.container}>
      <ul>
        <li>
          <h1>
            Nombre <i className={classes.userData}>{name}</i>
          </h1>
        </li>
        <li>
          <h1>
            Apellido <i className={classes.userData}>{lastname}</i>
          </h1>
        </li>
        <li>
          <h1>
            Email <i className={classes.userData}>{email}</i>
          </h1>
        </li>
        <li>
          <h1>
            Celular <i className={classes.userData}>{phone}</i>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default withStyles(styles)(UserProfile);
