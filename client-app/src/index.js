import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const root = document.querySelector("#app-root");

root.innerHTML = "";
ReactDOM.render(<App />, root);
