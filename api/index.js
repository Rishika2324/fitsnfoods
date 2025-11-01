const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully on Vercel!");
});

module.exports = app;
