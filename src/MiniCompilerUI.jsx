// src/MiniCompilerUI.jsx
import { useState } from "react";

function MiniCompilerUI() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleCompile = async () => {
    const response = await fetch("http://localhost:5000/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    setOutput(data.output);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">Mini Compiler</h1>
      <textarea
        className="w-full h-60 p-2 border rounded"
        placeholder="Enter code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCompile}
      >
        Compile
      </button>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}

export default MiniCompilerUI;
