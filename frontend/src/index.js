// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Mantén el BrowserRouter aquí
import "./index.css";
import App from "./App";

import AppProvider from "./context/AppProvider";

import ErrorBoundary from "./components/ErrorBoundary"; // Mantén el ErrorBoundary

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
