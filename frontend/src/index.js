// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import "./index.css";
import App from "./App";
import axios from "axios";


import AppProvider from "./context/AppProvider";

import ErrorBoundary from "./components/ErrorBoundary"; 


console.log("Base URL:", process.env.REACT_APP_API_URL)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
