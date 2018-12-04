import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import mainPanel from './containers/Panel';

export default(
  <Route  path="/" component={App} >
    <IndexRoute  components={{ panel: mainPanel}} />
  </Route>
);
