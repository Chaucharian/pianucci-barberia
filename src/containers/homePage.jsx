import React from 'react';
import {navigate} from 'hookrouter';
import Header from '../components/header';
import ReflectButton from '../components/reflectButton';
import { withStyles } from '@material-ui/styles';
import corte1 from '../assets/corte1.jpg';
import corte2 from '../assets/corte2.jpg';
import corte3 from '../assets/corte3.jpg';
import ImageSlideGalery from '../components/imageSlideGalery';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100vh",
        marginTop: "76px"
    }
}

export const HomePage = (props) => {
    const { classes } = props;
    return (
        <div>
            <Header></Header>
            <div className={classes.content}>
                <ImageSlideGalery images={['http://localhost:1234'+corte1,'http://localhost:1234'+corte2,'http://localhost:1234'+corte3]}></ImageSlideGalery>
               {/* <ImageSlider images={[corte1,corte2,corte3]} ></ImageSlider> */}
            </div>
        </div>
    );
}

export default withStyles(styles)(HomePage);
