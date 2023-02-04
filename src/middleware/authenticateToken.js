require("dotenv").config();
const jwtSecret = process.env.JWTSECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ err: "No Token given" });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ err: "Invalid Token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
