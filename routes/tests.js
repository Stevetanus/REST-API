const express = require("express");
const router = express.Router();
const Test = require("../models/test");

// Getting all
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find({});
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting One
router.get("/:id", getTest, (req, res) => {
  res.json(res.test);
});

//  Creating One
router.post("/", async (req, res) => {
  const test = new Test({
    question: req.body.question,
    answer: req.body.answer,
    incorrect_answers: req.body.incorrect_answers,
  });
  try {
    const newTest = await test.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  Updating One
router.patch("/:id", getTest, async (req, res) => {
  if (req.body.question != null) {
    res.test.question = req.body.question;
  }
  if (req.body.answer != null) {
    res.test.answer = req.body.answer;
  }
  if (req.body.incorrect_answers != null) {
    res.test.incorrect_answers = req.body.incorrect_answers;
  }
  try {
    const updatedTest = await res.test.save();
    res.json(updatedTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting One
router.delete("/:id", getTest, async (req, res) => {
  try {
    await res.test.remove();
    res.json({ message: "Delete test." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTest(req, res, next) {
  let test;
  try {
    test = await Test.findById(req.params.id);
    if (test == null) {
      return res.status(404).json({
        message: "Cannot find test.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  res.test = test;
  next();
}

module.exports = router;
