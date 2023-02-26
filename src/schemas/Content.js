const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  title: String,
  content_text: String,
  img_url: String,
  created_at: Date,
});
const Content = mongoose.model("Content", ContentSchema);

module.exports = { Content };
