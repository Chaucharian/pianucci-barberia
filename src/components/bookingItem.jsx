import React from 'react';
import { withStyles } from '@material-ui/styles';
import AnimatedButton from './animatedButton';

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0, 
        overflow: "auto",
        display: "block",
        zIndex: "1000",
        width: "100%",
        height: "65px",
        minHeight: "50px",
        backgroundColor: "#000",
        borderBottom: "1px solid #FFF",
        transition: ".5s ease-in-out",
        padding: "10px 0px 0px 10px"
    }
}

const BookingItem = (props) => {
    const { classes } = props;
    const [open, showNavbar] = useState(false);
    
    return (
        <section>
            <AnimatedButton ></AnimatedButton>
        </section>
    );
}

export default withStyles(styles)(BookingItem);