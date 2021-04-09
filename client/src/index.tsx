import React from "react";
import ReactDOM from "react-dom";
import ApolloConfig from "./ApolloConfig";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(ApolloConfig, document.getElementById("root"));

serviceWorker.unregister();
