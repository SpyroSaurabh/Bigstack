const express = require("express");
const router = express.Router();

const { isSignedin, isAuthenticated } = require("../controllers/auth");
const {
  getQuestionById,
  submittingQuestion,
  getAllQuestions,
  answersToQuestions,
  upvoteToQuestion,
} = require("../controllers/question");

const { getUserById } = require("../controllers/user");
const { getProfileById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("questionId", getQuestionById);
router.param("profileId", getProfileById);

//read

router.get("/question/every", getAllQuestions);

//create

router.post(
  "/question/create/:userId",
  isSignedin,
  isAuthenticated,
  submittingQuestion
);

router.post(
  "/question/answers/:questionId/:userId",
  isSignedin,
  isAuthenticated,
  answersToQuestions
);

router.post(
  "/question/upvotes/:questionId/:profileId/:userId",
  isSignedin,
  isAuthenticated,
  upvoteToQuestion
);

module.exports = router;
