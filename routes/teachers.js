const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const abcd = ["A.", "B.", "C.", "D.", "E."];
const multer = require("multer");
const upload = multer();
router.get("/", (req, res) => {
  res.render("teachers/home");
});

router.get("/all", async (req, res) => {
  let pages = 10;
  let page = 1;
  let link2 = `all/${pages + 10}`;
  let count;
  try {
    const tests = await Test.find({}).limit(10);

    for (let test of tests) {
      test.options = [test.answer, ...test.incorrect_answers];
    }
    res.render("teachers/all", { tests, abcd, page, link2, count });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/all/:pages", async (req, res) => {
  let pages = Number(req.params.pages);
  let page = Math.floor(pages / 10);
  if (isNaN(pages) || pages % 10 > 0) {
    res.redirect("/teachers/all");
  } else {
    try {
      const tests = await Test.find({})
        .skip(pages - 10)
        .limit(10);
      const count = (await Test.find({})).length;
      for (let test of tests) {
        test.options = [test.answer, ...test.incorrect_answers];
      }
      let link2 = `${pages + 10}`;
      let link1 = `${pages - 10}`;
      res.render("teachers/all", { tests, abcd, page, link1, link2, count });
    } catch (error) {
      res.status(404).send(error);
    }
  }
});

router.get("/add", async (req, res) => {
  try {
    res.render("teachers/add");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id);
    test.options = [test.answer, ...test.incorrect_answers];
    res.render("teachers/test", { test, abcd });
  } catch (error) {
    return res.redirect("/teachers/all");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.render("teachers/edit", { test });
  } catch (error) {
    return res.redirect("/teachers/all");
  }
});

// router.post("/:id/edit", async (req, res) => {
//   try {
//     const test = await Test.findById(req.params.id);
//     res.render("teachers/edit", { test });
//   } catch (error) {
//     return res.redirect("/teachers/all");
//   }
// });

router.post("/add", upload.none(), async (req, res) => {
  try {
    const test = new Test({
      category: req.body.add.category,
      question: req.body.add.question,
      answer: req.body.add.answer,
      incorrect_answers: req.body.add.options.filter(Boolean),
    });
    await test.save();
    res.redirect(`${test._id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
