async function login(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Please send a valid request body" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please send an email and a password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Email not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "Password not correct" });
  }

  const token = jwt.sign({ _id: user._id.toString(), email }, jwtSecret, {
    expiresIn: "2d",
  });

  res.json({ email, token });
}

module.exports = { login };
