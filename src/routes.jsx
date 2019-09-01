import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App/App';
import loginPanel from './containers/Login';

export default(
  <Route  path="/" component={App} >
    <IndexRoute  components={{ panel: loginPanel}} />
  </Route>
);
