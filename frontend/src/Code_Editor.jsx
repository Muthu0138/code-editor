import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios"; 

function CodeEditor() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [output,setOutput] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);

    // Optional: Load a template for each language
    if (lang === "python") setCode("# Write your Python code here");
    else if (lang === "cpp") setCode("// Write your C++ code here");
    else setCode("// Write your JavaScript code here");
  };

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/run", {
        code,
        language,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error connecting to backend");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#1e1e1e" }}>
        <label style={{ color: "white", marginRight: "10px" }}>Language:</label>
        <select onChange={handleLanguageChange} value={language}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />

      <button
        onClick={runCode}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Run
      </button>
      <pre
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "10px",
          margin: 0,
          overflow: "auto",
        }}
      >
        {output}
      </pre>
    </div>
  );
}

export default CodeEditor;
