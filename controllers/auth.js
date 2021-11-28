const User = require("../models/person");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.auth = (req, res) => {
  res.json({
    message: "Auth is success",
  });
};

exports.register = (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Invalid details",
      });
    }

    res.json({
      message: "Registeration successfull",
      name: user.name,
      email: user.email,
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: errors.array()[0].msg,
    });
  }

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Email does not exist",
      });
    } else if (!user) {
      return res.status(400).json({
        err: "User does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({ err: "Password does not match" });
    }

    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.isSignedin = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//Custom Middleware

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};
