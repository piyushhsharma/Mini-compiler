// src/index.js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Ensure this imports Tailwind or custom styles
import App from "./App";

// App component handling the code input, API call, and output rendering
function MiniCompilerApp() {
  const [code, setCode] = useState("");    // Stores the user input code
  const [output, setOutput] = useState(""); // Stores the compiled output or error message
  const [isLoading, setIsLoading] = useState(false); // State to track if the API is loading

  // Handle the code submission to the backend
  const handleCompile = async () => {
    setIsLoading(true);  // Set loading to true when compiling
    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Send code as JSON to the backend
      });

      const data = await response.json();  // Assume the backend returns JSON
      if (response.ok) {
        setOutput(data.output);  // Display the compiled output from the backend
      } else {
        setOutput(`Error: ${data.error}`); // Display any errors from the backend
      }
    } catch (error) {
      setOutput("Compilation failed. Please try again."); // Display a fallback error
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6">Mini Compiler</h1>
      <textarea
        className="w-4/5 h-64 p-4 border-2 border-gray-300 rounded-md mb-4"
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}  // Update the code state as the user types
      />
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        onClick={handleCompile}
        disabled={isLoading}  // Disable button while loading
      >
        {isLoading ? "Compiling..." : "Compile"}
      </button>
      <div className="mt-6 w-4/5">
        <h2 className="text-xl font-semibold mb-2">Output:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">{output}</pre>
      </div>
    </div>
  );
}

// Render the app in the root DOM element
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MiniCompilerApp />
  </React.StrictMode>
);

