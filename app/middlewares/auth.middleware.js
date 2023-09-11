const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../services/config.service");
const User = require("../models/user.model");

module.exports = (role) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ").pop();
    if (!token) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    return jwt.verify(token, tokenSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      const user = decoded.user;
      if (!user) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      const userDoc = await User.findById(user).select("-password");
      if ((userDoc && userDoc.role === role) || !role) {
        req.user = userDoc;
        return next();
      }
      return res.status(401).send({ message: "Unauthorized!" });
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error!" });
  }
};
