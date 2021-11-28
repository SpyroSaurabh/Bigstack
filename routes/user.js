const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  createProfile,
  getProfileById,
  // getProfileUsername,
  updateUserProfile,
  getUserProfile,
  deleteUser,
  createWorkRole,
  deleteWorkrole,
} = require("../controllers/user");
const { isSignedin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("profileId", getProfileById);
// router.param("profileName", getProfileUsername);

router.get("/user/:userId", isSignedin, isAuthenticated, getUser);

//read
router.get(
  "/profile/:username",
  // isSignedin,
  // isAuthenticated,
  getUserProfile
);

//create
router.post(
  "/profile/create/:userId",
  isSignedin,
  isAuthenticated,
  createProfile
);

router.post("/profile/:profileId/:userId", createWorkRole);

//Update
router.put(
  "/profile/:profileId/:userId",
  isSignedin,
  isAuthenticated,
  updateUserProfile
);

//delete
router.delete(
  "/profile/:profileId/:userId",
  isSignedin,
  isAuthenticated,
  deleteUser
);

router.delete(
  "/profile/:userId/:profileId/:w_id",
  isSignedin,
  isAuthenticated,
  deleteWorkrole
);

module.exports = router;
