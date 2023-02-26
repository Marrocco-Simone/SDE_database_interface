const { Content } = require("../schemas");

async function getUserContent(req, res) {
  try {
    const userContents = await Content.find({ user: req.user._id })
      .select("-img_url")
      .select("-content_text");
    res.json(userContents.map(u => u.toObject()));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { getUserContent };
