import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const styles = {
      errorDiv: {
        color: "#cc0000",
        backgroundColor: "#ffeaea", 
        border: "2px solid #ff9999",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }
    };
    if (this.state.hasError) return <div style={styles.errorDiv}>Terjadi error: {this.state.error?.message}</div>;
    return this.props.children;
  }
}