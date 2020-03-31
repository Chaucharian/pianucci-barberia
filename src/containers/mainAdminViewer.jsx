import React, { useEffect } from 'react';
import { useStateValue } from '../state/rootState';
import * as appActions from '../actions/app';
import Header from '../components/header';
import ReactPageScroller from "react-page-scroller";
import { withStyles } from '@material-ui/styles';
import BookingAdminList from './bookingAdminList';
import ScheduleHandler from './scheduleHandler';

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
        top: "75%",
        left: "45%"
    },
    nextPageButton: {
        color: "#FFF",
        fontSize: "40px",
        border: "none",
        outline: "0px",
        background: "transparent",
        transition: "1s all ease-in-out",

        "&:hover": {
            color: "#000",
            paddingTop: "10px"
        }
    }
}

export const MainAdminViewer = (props) => {
    const { classes } = props; 
    const [state, dispatch] = useStateValue();
    const { scrollDownDisabled, scrollUpDisabled, currentPage } = state;
    let pageScroller = null;

    const pageOnChange = scroll => {
        goToPage(scroll -1);
    }

    const goToPage = pageNumber => {
        if(pageNumber !== currentPage) {
            dispatch( appActions.changePage(pageNumber) );
        }
    }

    const setScrollHandler = scroll => {
        if(scroll) {
            pageScroller = scroll;
        }
    }

    const disableScroll = disable => {
        dispatch(appActions.disableScrollUp(disable));
        dispatch(appActions.disableScrollDown(disable));
    }

    const actionHeaderHandler = action => {
        if(action === "logout") {
            dispatch(appActions.logoutUser(true));
        } else if(action === "schedule") {
            dispatch(appActions.changePage(0));
        } else if(action === "bookings") {
            dispatch(appActions.changePage(1));
        }
    }

    useEffect(() => {
        pageScroller.goToPage(currentPage);
    }, [currentPage]);

    return (
        <div>
            <Header onAction={actionHeaderHandler} isAdmin={true} ></Header>
            <div className={classes.content}>
                <ReactPageScroller ref={setScrollHandler} pageOnChange={pageOnChange} blockScrollDown={scrollDownDisabled} blockScrollUp={scrollUpDisabled} >
                    <ScheduleHandler />
                    <BookingAdminList onDisableScroll={disableScroll} />
                </ReactPageScroller>
            </div>
        </div>
    );
}

export default withStyles(styles)(MainAdminViewer);

