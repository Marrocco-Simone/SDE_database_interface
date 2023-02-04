require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

const { requestLogger } = require("./middleware/requestLogger");
const { authenticateToken } = require("./middleware/authenticateToken");
const { serverOnline } = require("./controllers/serverOnline");
const { login } = require("./controllers/login");
const { generateNewContent } = require("./controllers/generateNewContent");
const { getUserContent } = require("./controllers/getUserContent");
const { updateContent } = require("./controllers/updateContent");

const app = express();
const port = 3000;
const mongoDbUrl = process.env.MONGODBURL;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(requestLogger);

app.get("/", serverOnline);
app.get("/db", serverOnline);
app.post("/db/login", login);
app.put("/db/generate", authenticateToken, generateNewContent);
app.get("/db/get", authenticateToken, getUserContent);
app.post("/db/update/:content_id", authenticateToken, updateContent);

app.listen(port, async () => {
  await connect(mongoDbUrl);
  console.log(`Listening on port http://localhost:${port}`);
});
