// src/components/ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado:", error);
    console.error("Información adicional:", info);
    this.setState({ error, errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      // Muestra el error y la información adicional en la interfaz
      return (
        <div>
          <h1>Algo salió mal. Por favor intenta más tarde.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
