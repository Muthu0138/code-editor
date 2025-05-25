import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");

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
    </div>
  );
}

export default CodeEditor;
