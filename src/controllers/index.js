const { serverOnline } = require("./serverOnline");
const { login } = require("./login");
const { generateNewContent } = require("./generateNewContent");
const { getUserContent } = require("./getUserContent");
const { updateContent } = require("./updateContent");

module.exports = {
  serverOnline,
  login,
  generateNewContent,
  getUserContent,
  updateContent,
};
