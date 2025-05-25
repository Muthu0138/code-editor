const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to run code
app.post("/run", async (req, res) => {
  const { code, language } = req.body;

  const fileName = {
    javascript: "code.js",
    python: "code.py",
    cpp: "code.cpp"
  }[language];

  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, code);

  let command;
  if (language === "javascript") command = `node ${fileName}`;
  else if (language === "python") command = `python3 ${fileName}`;
  else if (language === "cpp") command = `g++ ${fileName} -o code && ./code`;

  exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) return res.json({ output: stderr || error.message });
    res.json({ output: stdout });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
