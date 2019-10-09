import React, { useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as actionTypes from '../actions/types';
import * as appActions from '../actions/app';
import Header from '../components/header';
import ReflectButton from '../components/reflectButton';
import ReactPageScroller from "react-page-scroller";
import { withStyles } from '@material-ui/styles';
import corte1 from '../assets/corte1.jpg';
import corte2 from '../assets/corte2.jpg';
import corte3 from '../assets/corte3.jpg';
import ImageSlideGalery from '../components/imageSlideGalery';
import BookingList from './bookingList';
import BookingHandler from './bookingHandler';

const styles = {
    content: {
        backgroundColor: "#FFF",
        height: "100vh"
    },
    headerSpace: {
        height: "76px"
    },
    buttonContainer: {
        position: "fixed",
        top: "85%",
        left: "45%"
    },
    nextPageButton: {
        color: "#000",
        fontSize: "40px",
        border: "none",
        outline: "0px",
        background: "transparent",
        transition: "1s all ease-in-out",

        "&:hover": {
            color: "#FFF",
            paddingTop: "10px"
        }
    }
}

export const HomePage = (props) => {
    const { classes } = props; 
    const [state, dispatch] = useStateValue();
    const { isDealing, currentPage } = state;
    console.log(state);
    let pageScroller = null;

    const pageOnChange = scroll => {
        dispatch( appActions.changePage({ payload: scroll }) );
    }

    const goToPage = (page) => {
        pageScroller.goToPage(page);
        dispatch( appActions.changePage({ payload: page }) );
    }

    const setScrollHandler = scroll => {
        if(scroll) {
            pageScroller = scroll;
        }
    }

    return (
        <div>
            <Header></Header>
            <div className={classes.content}>
                <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange}>
                    <div>
                        <ImageSlideGalery images={[corte1,corte2,corte3]}></ImageSlideGalery>
                        <div className={classes.buttonContainer}>
                            <button className={classes.nextPageButton} onClick={() => goToPage(1)}>
                                <i className="fas fa-arrow-circle-down"></i>
                            </button>
                        </div>
                    </div>
                    <BookingList></BookingList>
                    {
                        isDealing ? <BookingHandler></BookingHandler> : null
                    }
                </ReactPageScroller>
            </div>
        </div>
    );
}

export default withStyles(styles)(HomePage);


