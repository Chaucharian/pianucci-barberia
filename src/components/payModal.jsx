import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import ReflectButton from './reflectButton';
import WhiteTextField from './textField'; 

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& div": {
        outline: "none"
    }
  },
  paper: {
    textAlign: "center",
    backgroundColor: "#000",
    border: '2px solid #FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
      "& input": {
        textAlign: "center",
        fontSize: "25px"
      }
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const styles = {
}

const CustomModal = ({ open, title, content,onAction }) => {
    const classes = useStyles();
    const [amount, setAmount] = useState("");

    const submit = () => {
        const normalizedAmount = amount.length === 0 ? '0' : amount;
        onAction("confirm", normalizedAmount);
    }

    const inputChange = ({ target: { value } }) => setAmount(value); 

    return (
        <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => onAction("cancel")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{title}</h2>
            <p id="spring-modal-description">{content}</p>
            <WhiteTextField
                    classes={ { root: classes.textField } }
                    placeholder="0$"
                    name="amount"
                    margin="normal"
                    type="number" 
                    value={amount}
                    onChange={inputChange}
            >
            </WhiteTextField> 
            <div>
                <ReflectButton text="COBRAR" clicked={() => submit() } />
                <ReflectButton text="CANCELAR" clicked={() => onAction("cancel")} />
            </div>
          </div>
        </Fade>
      </Modal>
    );
}

export default withStyles(styles)(CustomModal);