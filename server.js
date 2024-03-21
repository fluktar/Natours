const path = require("path");

const express = require("express");

const routs = require("./routes/link");

const db = require("./data/database");
const { error } = require("console");

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use("/dist", express.static("dist")); // Serve static files (e.g. CSS files)

app.use(routs);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});
app.use(function (req, res, next) {
  // Default 404 page

  res.status(404).render("404");
});

// db.connectToDatabase().then(function () {
//   app.listen(3005);
// });

async function startApp() {
  try {
    await db.connectToDatabase();
    app.listen(3005);
  } catch (error) {
    console.log(error);
  }
}
startApp();
