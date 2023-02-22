const { serverOnline } = require("./serverOnline");
const { login } = require("./login");
const { sendTokenUser } = require("./sendTokenUser");
const { generateNewContent } = require("./generateNewContent");
const { getUserContent } = require("./getUserContent");
const { getSingleContent } = require("./getSingleContent");
const { updateContent } = require("./updateContent");

module.exports = {
  serverOnline,
  login,
  sendTokenUser,
  generateNewContent,
  getUserContent,
  getSingleContent,
  updateContent,
};
