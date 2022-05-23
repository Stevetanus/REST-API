const mongoose = require("mongoose");
const moment = require("moment-timezone");

const testSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    default: "General Knowledge",
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  incorrect_answers: {
    type: Array,
    default: [],
  },
  createDate: {
    type: Date,
    required: true,
    default: moment().tz("Asia/Taipei").format(),
  },
});

module.exports = mongoose.model("Test", testSchema);
