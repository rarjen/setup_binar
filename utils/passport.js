const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt = require("bcrypt");

async function authenticate(email, password, done) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // balikan error
      return done(null, false, { message: "User Not Found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // balikan error
      return done(null, false, { message: "Invalid Password" });
    }

    return done(null, user); // mengirim user
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}

passport.use(
  new LocalStrategy(
    { emailField: "email", passwordField: "password" },
    authenticate
  )
);

// untuk menghapus dan meng-create session
// membuat sesi/token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// menghaspus sesi
// extract token
passport.deserializeUser(async (id, done) => {
  //   done(null, await User.findOne({ where: { id: user.id } }));
  done(null, await User.findOne({ where: { id } }));
});

module.exports = passport;
