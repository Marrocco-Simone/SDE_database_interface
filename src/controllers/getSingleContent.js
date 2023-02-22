const { isValidObjectId } = require("mongoose");
const { Content } = require("../schemas");

async function getSingleContent(req, res) {
  try {
    if (!req.body) {
      return res.status(400).send({ error: "Request body not sent" });
    }

    const contentId = req.params.contentId;

    if (!contentId || !isValidObjectId(contentId)) {
      return res.status(400).send({ error: "Content ID not valid" });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).send({ error: "Content not found" });
    }

    if (!content.user.equals(req.user._id)) {
      return res.status(403).send({ error: "Forbidden" });
    }

    res.send(content.toObject());
  } catch (err) {
    console.log('super errore')
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { getSingleContent };
