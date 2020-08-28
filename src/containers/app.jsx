import React from "react";
import { Router } from "./router";

import { StateProvider } from "../state/rootState";
import { reducer, initialState } from "../reducers/mainReducer";

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router></Router>
  </StateProvider>
);

export default App;
