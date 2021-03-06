import React from 'react';
import { withStyles } from '@material-ui/styles';
import scissors from '../assets/pianucci-scissors.gif';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      transition: 'all .5s ease-in-out',
    },
  },
  show: {
    opacity: '1',
  },
  hide: {
    opacity: '0',
  },
};

export const Spinner = (props) => {
  const { classes, children, loading } = props;

  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <img
            src={scissors}
            className={loading ? classes.show : classes.hide}
            width="40"
            height="40"
          />
        </div>
      ) : children ? (
        children
      ) : (
        <></>
      )}
    </>
  );
};

export default withStyles(styles)(Spinner);
