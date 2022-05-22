const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// write pages
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");

mongoose.connect(process.env.DB_URL), { useNewUrlParser: true };
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// parse the incoming requests with JSON payloads basing on the bodyparser.
app.use(express.json());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static path set to public repository
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
const testsRouter = require("./routes/tests");
const teachersRouter = require("./routes/teachers");
app.use("/tests", testsRouter);
app.use("/teachers", teachersRouter);

app.get("/", (req, res) => {
  res.render("layouts/boilerplate");
});

app.listen(3001, () => console.log(`Server started at localhost:3001`));
