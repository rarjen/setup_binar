require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const passport = require("./utils/passport");
const session = require("express-session");
const flash = require("express-flash");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
