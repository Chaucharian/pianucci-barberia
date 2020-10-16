import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { reducer, initialState, StateProvider } from "/context";
import { PrivateRoute } from "/core";
import { Login, MainViewer, MainAdminViewer } from "/containers";

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={MainViewer} />
          {/* <PrivateRoute path="/admin" component={MainAdminViewer} /> */}
        </Switch>
      </Router>
    </StateProvider>
  );
};

export default App;
