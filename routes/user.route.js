const { Router } = require("express");
const { UserModel } = require("../models/user.models");
var jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const bcrypt = require("bcrypt");

const userRoute = Router();

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass.toString(), user.pass).then(function (result) {
        if (result) {
          var token = jwt.sign(
            { authorID: user._id, name: user.name },
            "masai"
          );
          res.send({ msg: "Login SuccessFull", token });
        } else {
          res.send({ msg: "Incorrect Password" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (error) {
    res.send(error);
  }
});

userRoute.post("/register", async (req, res) => {
  const User = req.body;
  try {
    bcrypt.hash(User.pass, 5, async (err, hash) => {
      const user = new UserModel({ ...User, pass: hash });
      await user.save();
      res.send("User Added");
    });
  } catch (error) {
    res.send({ msg: "User Registered" });
  }
});

userRoute.get("/users", auth, async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
});

module.exports = { userRoute };
// / 644c8e424e3d8d7ced042ef
