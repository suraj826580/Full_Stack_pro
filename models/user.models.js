const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    name: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
