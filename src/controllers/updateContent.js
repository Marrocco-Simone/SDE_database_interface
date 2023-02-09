const { Content, User } = require("../schemas");

async function updateContent(req, res) {
  try {
    res.status(501).send("TODO");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { updateContent };
