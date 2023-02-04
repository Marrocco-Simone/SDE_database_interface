require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
const jwtSecret = process.env.JWTSECRET;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/db", (req, res) => {
  res.json({ success: true });
});

app.get("/db/newuser", async (req, res) => {
  const newUser = new User({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  await newUser.save();

  res.json(newUser);
});

app.get("/db/fakecontent", (req, res) => {
  const fakeContent = {
    content_text: faker.lorem.paragraph(),
    title: faker.animal.cat(),
  };
  faker.image.animals;
  res.json(fakeContent);
});

app.post("/db/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Please send a valid request body" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please send an email and a password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Email not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "Password not correct" });
  }

  const token = jwt.sign({ _id: user._id.toString(), email }, jwtSecret, {
    expiresIn: "2d",
  });

  res.json({ email, token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ err: "No Token given" });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ err: "Invalid Token" });
    }
    req.user = user;
    next();
  });
}

app.put("/db/generate", authenticateToken, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Please send a valid request body" });
  }

  const { title, content_text } = req.body;

  if (!title || !content_text) {
    return res
      .status(400)
      .json({ error: "Please send all the required fields" });
  }

  const newContent = new Content({
    title,
    content_text,
    user: req.user._id,
    created_at: new Date(),
  });
  await newContent.save();

  res.json(newContent);
});

app.get("/db/get", authenticateToken, async (req, res) => {
  const userContents = await Content.find({ user: req.user._id });
  res.json(userContents);
});

app.post("/db/modify/:content_id", authenticateToken, async (req, res) => {});

app.listen(port, async () => {
  await mongoose.connect(mongoDbUrl);
  console.log(`Listening on port http://localhost:${port}`);
});
