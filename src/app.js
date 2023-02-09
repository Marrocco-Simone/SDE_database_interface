require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", true);

const { requestLogger, authenticateToken } = require("./middleware");
const {
  serverOnline,
  login,
  sendTokenUser,
  generateNewContent,
  getUserContent,
  updateContent,
} = require("./controllers");

const app = express();
const port = 3000;
const mongoDbUrl = process.env.MONGODBURL;

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

app.listen(port, async () => {
  await mongoose.connect(mongoDbUrl);
  console.log(`Listening on port http://localhost:${port}`);
});
