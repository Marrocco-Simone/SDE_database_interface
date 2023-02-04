const { Content } = require("../schemas");

async function getUserContent(req, res) {
  const userContents = await Content.find({ user: req.user._id });
  res.json(userContents);
}

module.exports = { getUserContent };
