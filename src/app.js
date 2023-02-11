const { requestLogger, authenticateToken } = require("./middleware");
const {
  serverOnline,
  login,
  sendTokenUser,
  generateNewContent,
  getUserContent,
  updateContent,
} = require("./controllers");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(requestLogger);

app.get("/", serverOnline);
app.get("/db", serverOnline);
app.post("/db/login", login);
app.get("/db/login", authenticateToken, sendTokenUser);
app.put("/db/generate", authenticateToken, generateNewContent);
app.get("/db/get", authenticateToken, getUserContent);
app.put("/db/update/:contentId", authenticateToken, updateContent);

module.exports = { app };
