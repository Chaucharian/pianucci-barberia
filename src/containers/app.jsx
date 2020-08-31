import React from "react";
import { Router } from "./router";

import { StateProvider } from "../context/context";
import { reducer, initialState } from "../context/mainReducer";

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router></Router>
  </StateProvider>
);

export default App;
