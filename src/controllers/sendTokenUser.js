function sendTokenUser(req, res) {
  try {
    res.send(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { sendTokenUser };
