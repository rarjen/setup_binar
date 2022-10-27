const express = require("express");
const router = express();
const auth = require("../controllers/auth");
const restrict = require("../middlewares/restrict");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/auth/register", auth.registerPage);
router.post("/auth/register", auth.register);

router.get("/auth/login", auth.loginPage);
router.post("/auth/login", auth.login);

router.get("/auth/whoami", restrict, auth.whoami);

module.exports = router;
