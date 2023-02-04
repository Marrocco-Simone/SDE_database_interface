const { Content } = require("../schemas");

async function generateNewContent(req, res) {
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
}

module.exports = { generateNewContent };
