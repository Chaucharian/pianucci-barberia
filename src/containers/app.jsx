import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from '/core/auth';
import { Login, MainViewer, MainAdminViewer } from '/containers';
import { useSelector, selectAuth } from '/context';
import { useUserLoggedIn } from '../core/user';
import Spinner from '/components/spinner';

const App = () => {
  const auth = useSelector(selectAuth);
  const isLoading = useUserLoggedIn();

  useEffect(() => {
    auth.setSW();
  }, [auth]);

  return (
    <Spinner loading={isLoading}>
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
    </Spinner>
  );
};

export default App;
