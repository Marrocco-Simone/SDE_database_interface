require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

mongoose.set("strictQuery", true);

const app = express();
const port = 3000;
const mongoDbUrl = process.env.MONGODBURL;

const myDataSchema = new mongoose.Schema({
  name: String,
  surname: String,
});
const MyData = mongoose.model("MyData", myDataSchema);

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/save", async (req, res) => {
  const newData = new MyData({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
  });
  await newData.save();

  res.json(newData);
});

app.get("/get", async (req, res) => {
  const fullDatabase = await MyData.find();
  res.json(fullDatabase);
});

app.listen(port, async () => {
  await mongoose.connect(mongoDbUrl);
  console.log(`Listening on port http://localhost:${port}`);
});
