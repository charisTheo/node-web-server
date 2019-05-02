// IMPORTS - REMOTE
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const passport = require("passport");

// IMPORTS - LOCAL
const config = require("./config");
const auth = require("./auth");

// VARIABLES
const PORT = config.PORT;
var app = express();

// VARIABLES CONFIGURATION
auth(passport);
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

// app.use((req, res, next) => {
//     res.render('updating.hbs');
// });

app.get("/", (req, res) => {
  res.render("home.hbs", { response: req, isAuthenticated: req.isAuthenticated() });
});

app.get("/hello", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Couldn't fulfill request"
  });
});

// Start the OAuth login process for Google.
app.get("/auth", passport.authenticate("google", {
    scope: config.google_photos_auth_scope,
    failureFlash: true, // Display errors to the user.
    session: true
  })
);

// Callback receiver for the OAuth process after log in.
app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
    failureFlash: true,
    session: true
  }), (req, res) => {
    // User has logged in.
    res.redirect("/");
  }
);

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Portfolio Page"
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
