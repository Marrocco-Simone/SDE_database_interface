require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

const port = process.env.SERVER_PORT ?? process.env.PORT ?? 3000;
const mongoDbUrl = process.env.MONGODBURL;

mongoose.set("strictQuery", true);
mongoose.connect(mongoDbUrl).then(() => console.log(`Connected to database`));

app.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}`);
});
