// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const sess_key = process.env.sess_key;
const sess_key2 = process.env.sess_key2;
const sess_key3 = process.env.sess_key3;

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: "session",
  keys: [sess_key, sess_key2, sess_key3],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const favouriteRoutes = require("./routes/favourites");
const contributionRoutes = require("./routes/contributions");
const createMapRoutes = require("./routes/createMap");
// const indexRoutes = require("./routes/index");
const mainPageRoutes = require("./routes/mainpage");
const viewMapRoutes = require("./routes/viewMap");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/favourites", favouriteRoutes(db));
app.use("/contributions", contributionRoutes(db));
app.use("/createMap", createMapRoutes(db));
// app.use("/index", indexRoutes(db));
app.use("/mainpage", mainPageRoutes(db));
app.use("/viewMap", viewMapRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const userID = req.query.userID;
  req.session["user_id"] = userID;
  if (req.session["user_id"]) {
    console.log(req.session["user_id"]);
    res.redirect("/mainpage")
  }
  // req.session.userID
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
