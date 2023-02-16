function serverOnline(req, res) {
  try {
    res.json({ success: true, online: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { serverOnline };
