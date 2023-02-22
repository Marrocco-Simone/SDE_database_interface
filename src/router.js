const { authenticateToken } = require("./middleware");
const {
  serverOnline,
  login,
  sendTokenUser,
  generateNewContent,
  getUserContent,
  updateContent,
  getSingleContent,
} = require("./controllers");

const express = require("express");
const router = express.Router();
router.use(express.json({ limit: "16mb" }));

router.get("/", serverOnline);
router.post("/login", login);
router.get("/login", authenticateToken, sendTokenUser);
router.put("/store", authenticateToken, generateNewContent);
router.get("/get", authenticateToken, getUserContent);
router.get("/get/:contentId", authenticateToken, getSingleContent);
router.put("/update/:contentId", authenticateToken, updateContent);

module.exports = { router };
