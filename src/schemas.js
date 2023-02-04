const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const ContentSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  title: String,
  content_text: String,
  // TODO images,
  created_at: Date,
});
const Content = mongoose.model("Content", ContentSchema);

module.exports = {User, Content};