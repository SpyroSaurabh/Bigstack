const Question = require("../models/question");
const Profile = require("../models/profile");

exports.submittingQuestion = (req, res) => {
  const newQuestion = new Question({
    textone: req.body.textone,
    texttwo: req.body.texttwo,
    user: req.profile._id,
    name: req.body.name,
  });
  newQuestion.save((err, que) => {
    if (err || !que) {
      return res.status(400).json({
        error: "Unable to push question to database",
      });
    }
    res.json(que);
  });
};

exports.getAllQuestions = (req, res) => {
  Question.find()
    .sort({ _id: -1 })
    .exec((err, que) => {
      if (err || !que) {
        return res.status(400).json({
          error: "No question found",
        });
      }
      res.json(que);
    });
};

exports.getQuestionById = (req, res, next, id) => {
  Question.findById(id).exec((err, que) => {
    if (err) {
      res.json({
        error: "Question not found in DB",
      });
    }
    req.userQuestion = que;
    next();
  });
};

exports.answersToQuestions = (req, res) => {
  Question.findById({ _id: req.userQuestion._id }).exec((err, que) => {
    if (err || !que) {
      return res.status(400).json({
        error: "Question is not here",
      });
    }
    const newAnswer = {
      user: req.profile._id,
      name: req.body.name,
      text: req.body.text,
    };
    que.answer.unshift(newAnswer);
    console.log(que);
    que.save((err, q) => {
      if (err) {
        return res.status(400).json({
          error: "No answer added",
        });
      } else {
        return res.status(200).json({
          message: "Answer added successfully",
        });
      }
    });
  });
};

exports.upvoteToQuestion = (req, res) => {
  Profile.findOne({ user: req.userProfile._id }).exec((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        error: "Profile doesn't exist",
      });
    }
    Question.findById({ _id: req.userQuestion._id }).exec((err, que) => {
      if (err || !que) {
        return res.status(400).json({
          error: "Question not found",
        });
      }
      if (
        que.upvotes.filter(
          (upvote) => upvote.user.toString() === req.userProfile._id.toString()
        ).length > 0
      ) {
        return res.status(400).json({
          error: "User already upvoted",
        });
      }
      que.upvotes.unshift({ user: req.userProfile._id });
      que.save((err, q) => {
        if (err || !q) {
          return res.status(400).json({
            error: "No upvote",
          });
        }
        res.json(q);
      });
    });
  });
};
