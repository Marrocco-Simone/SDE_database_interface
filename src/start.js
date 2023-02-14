require("dotenv").config();
const mongoose = require("mongoose");
const { router } = require("./router");
const express = require("express");
const cors = require("cors");
const { requestLogger } = require("./middleware");
const { serverOnline } = require("./controllers");

const port = process.env.SERVER_PORT ?? process.env.PORT ?? 3000;
const mongoDbUrl = process.env.MONGODBURL;

mongoose.set("strictQuery", true);
mongoose.connect(mongoDbUrl).then(() => console.log(`Connected to database`));

const app = express();

app.use(requestLogger);
app.use(cors({ origin: true }));
app.use("/db", router);
app.get("/", serverOnline);

app.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}`);
});
