// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import the global styles (like Tailwind CSS or your custom styles)

const rootElement = document.getElementById("root");

// Initialize the root render with React Strict Mode for better debugging
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
