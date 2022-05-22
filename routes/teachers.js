const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const abcd = ["A.", "B.", "C.", "D."];
const multer = require("multer");
const upload = multer();
router.get("/", (req, res) => {
  res.render("teachers/home");
});

router.get("/all", async (req, res) => {
  try {
    const tests = await Test.find({});
    for (let test of tests) {
      test.options = [test.answer, ...test.incorrect_answers];
    }
    res.render("teachers/all", { tests, abcd });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/add", async (req, res) => {
  try {
    res.render("teachers/add");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/add", upload.none(), async (req, res) => {
  res.send(req.body);
});

module.exports = router;
