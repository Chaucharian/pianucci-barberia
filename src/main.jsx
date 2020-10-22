import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import { reducer, initialState, StateProvider } from "/context";

ReactDOM.render(<StateProvider initialState={initialState} reducer={reducer}><App /></StateProvider>, document.getElementById("app"));
