import React, { useState, useEffect, useCallback } from "react";
import { useRoutes, navigate, useControlledInterceptor } from "hookrouter";
import firebase from "firebase";
import "firebase/auth";
import { useStateValue } from "../state/rootState";
import * as appActions from "../actions/app";
import firebaseConfig from "../../credentials/firebaseToken";
import { NotFoundPage } from "../components/notFoundPage";
import MainViewer from "./mainViewer";
import MainAdminViewer from "./mainAdminViewer";
import Login from "./login";
import * as api from "../services/api";

const routes = {
  "/": () => <MainViewer />,
  "/admin": () => <MainAdminViewer />,
  "/login": () => <Login />,
};

const LoadingImg = ({ image }) => (
  <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
    <img style={{ width: "150px", height: "70px" }} src={image}></img>
  </div>
);

export const Router = () => {
  const [state, setState] = useState({ loading: true });
  const [{ user, logout }, dispatch] = useStateValue();
  const routeResult = useRoutes(routes);
  const [nextPath, confirmNavigation] = useControlledInterceptor();
  const { loading } = state;

  const userHandler = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        api.logout(user.id).then((data) => {
          window.localStorage.removeItem("user");
          dispatch(appActions.reset());
          navigate("/login");
        });
      })
      .catch(function (error) {
        // An error happened.
        console.log(" LOGOUT ERROR ", error);
      });
  };

  const viewToRender = () => {
    let resultView = (
      <LoadingImg
        image={"https://pianuccibarberia.com/assets/pianucci-scissors.gif"}
      />
    );
    if (!loading) {
      resultView = routeResult;
    }
    return resultView;
  };

  useEffect(() => {
    userHandler();
    const sessionStored = JSON.parse(window.localStorage.getItem("user"));

    if (sessionStored && user.id === "") {
      const { isAdmin } = sessionStored;
      if (isAdmin) {
        dispatch(appActions.userLoggedIn(sessionStored));
        navigate("/admin");
        setState({ loading: false });
      } else {
        dispatch(appActions.userLoggedIn(sessionStored));
        navigate("/");
        setState({ loading: false });
      }
    } else if (user.id !== "") {
      const { isAdmin } = sessionStored;
      if (isAdmin) {
        navigate("/admin");
        setState({ loading: false });
      } else {
        navigate("/");
        setState({ loading: false });
      }
    } else {
      navigate("/login");
      setState({ loading: false });
    }
  }, [user]);

  useEffect(() => {
    if (logout) {
      logoutHandler();
    }
  }, [logout]);

  useEffect(() => {
    if (nextPath === null) return;
    if (user.id !== "" && nextPath === "/login") {
      logoutHandler();
    }
    confirmNavigation();
  }, [nextPath]);

  return viewToRender() || <NotFoundPage />;
};
