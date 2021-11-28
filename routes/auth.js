const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { auth, register, login, isSignedin } = require("../controllers/auth");

router.get("/auth", auth);
router.post(
  "/register",
  [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 5 character").isLength({
      min: 3,
    }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  login
);

// router.get("/profile", isSignedin, (req, res) => {
//   // const { _id, name, email } = req.user;
//   // res.json({
//   //   id: _id,
//   //   name: name,
//   //   email: email,
//   // });
//   res.json(req.auth);
// });

module.exports = router;
