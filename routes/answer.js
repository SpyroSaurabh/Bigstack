const express = require("express");
const router = express.Router();

const { answer } = require("../controllers/answer");

router.get("/answer", answer);

module.exports = router;
