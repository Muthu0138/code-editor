import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function Code_Editor() {
  const [code, setCode] = useState("// Write your code here\n");

  function handleEditorChange(value) {
    setCode(value);
  }

  return (
    <div style={{ height: "100vh" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default Code_Editor;
