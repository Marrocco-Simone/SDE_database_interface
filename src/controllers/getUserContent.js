const { Content } = require("../schemas");

async function getUserContent(req, res) {
  try {
    const userContents = await Content.find({ user: req.user._id });
    res.json(
      userContents.map((u) => {
        return { ...u.toObject(), img_b64: "" };
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { getUserContent };
