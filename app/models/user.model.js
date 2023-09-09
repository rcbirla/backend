const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../services/config.service");

function generateHash(password) {
  return bcrypt.hashSync(password, 10);
}
function compare(password1, password2) {
  return bcrypt.compareSync(password1, password2);
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  hashPassword() {
    this.password = generateHash(this.password);
  },
  comparePassword(password) {
    return compare(password, this.password);
  },
  generateSession() {
    return jwt.sign({ user: this._id }, tokenSecret, {
      expiresIn: 60 * 60 * 24,
    });
  },
};

module.exports = mongoose.model("User", UserSchema);
