import React from "react";
import { withStyles } from "@material-ui/styles";
import CircularNumberIndicator from "./circularNumberIndicator";

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "50px",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export const stepIndicator = (props) => {
  const { classes, currentStep, clicked } = props;

  return (
    <div className={classes.container}>
      <CircularNumberIndicator
        number={1}
        on={currentStep === 1}
        clicked={(number) => clicked(number)}
      ></CircularNumberIndicator>
      <CircularNumberIndicator
        number={2}
        on={currentStep === 2}
        clicked={(number) => clicked(number)}
      ></CircularNumberIndicator>
      <CircularNumberIndicator
        number={3}
        on={currentStep === 3}
        clicked={(number) => clicked(number)}
      ></CircularNumberIndicator>
    </div>
  );
};

export default withStyles(styles)(stepIndicator);
