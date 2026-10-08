import React from "react";
import ReactDOM from "react-dom/client";
import { findRoute } from "./routes";
import "./index.css";

const { Component } = findRoute(window.location.pathname);

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
