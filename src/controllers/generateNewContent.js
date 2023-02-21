const { Content } = require("../schemas");

async function generateNewContent(req, res) {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Please send a valid request body" });
    }

    const { title, content_text, img_b64 } = req.body;

    if (!title || !content_text || !img_b64) {
      return res
        .status(400)
        .json({ error: "Please send all the required fields" });
    }

    const newContent = new Content({
      title,
      content_text,
      img_b64,
      user: req.user._id,
      created_at: new Date(),
    });
    await newContent.save();

    res.json({ ...newContent.toObject(), img_b64: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { generateNewContent };
