import React, { useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "/core/auth";
import { Login, MainViewer, MainAdminViewer } from "/containers";
import { useSelector, selectAuth } from "/context";

const App = () => {
  const auth = useSelector(selectAuth);

  useEffect( () => {
    auth.setSW();
  }, []);
  
  return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/admin"
            redirectPath="/"
            component={MainAdminViewer}
            adminRequired
          />
          <PrivateRoute path="/" component={MainViewer} />
          <Redirect to="/login" />
        </Switch>
      </Router>
  );
};

export default App;
