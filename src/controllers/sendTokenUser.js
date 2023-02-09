function sendTokenUser(req, res) {
  res.send(req.user);
}

module.exports = { sendTokenUser };
