import { compareSync } from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.model";

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

// Persist user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
