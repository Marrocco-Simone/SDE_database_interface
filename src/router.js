const { authenticateToken } = require("./middleware");
const {
  serverOnline,
  login,
  sendTokenUser,
  generateNewContent,
  getUserContent,
  updateContent,
} = require("./controllers");

const express = require("express");

const router = express.Router();
router.use(express.json());

router.get("/", serverOnline);
router.post("/login", login);
router.get("/login", authenticateToken, sendTokenUser);
router.put("/generate", authenticateToken, generateNewContent);
router.get("/get", authenticateToken, getUserContent);
router.put("/update/:contentId", authenticateToken, updateContent);

module.exports = { router };
