var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(" ")[1], "masai", (err, decoded) => {
      if (decoded) {
        req.body.authorID = decoded.authorID;
        req.body.author = decoded.name;
        next();
      } else {
        res.send({ msg: "Wrong Credentials" });
      }
    });
  } else {
    res.send({ msg: "Please Login First" });
  }
};

module.exports = { auth };
