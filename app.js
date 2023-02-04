require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

mongoose.set("strictQuery", true);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const ContentSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  title: String,
  content_text: String,
  // TODO images,
  created_at: Date,
});
const Content = mongoose.model("Content", ContentSchema);

const app = express();
const port = 3000;
const mongoDbUrl = process.env.MONGODBURL;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/newuser", async (req, res) => {
  const newUser = new User({
    email: faker.internet.email(),
    password: faker.internet.password("memorable"),
  });
  await newUser.save();

  res.json(newUser);
});

app.get("/fakecontent", (req,res) => {
  const fakeContent = {
    content_text: faker.lorem.paragraph(),
    title: faker.animal.cat(),
  }
  faker.image.animals
  res.json(fakeContent);
});

app.post("/login", async (req, res) => {});
app.put("/generate", async (req, res) => {});
app.get("/get", async (req, res) => {});
app.post("/modify/:content_id", async (req, res) => {});

app.listen(port, async () => {
  await mongoose.connect(mongoDbUrl);
  console.log(`Listening on port http://localhost:${port}`);
});
