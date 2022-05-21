import { compareSync } from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as authService from "../services/auth.service";

passport.use(
  new LocalStrategy((username, password, done) => {
    authService
      .findOneByEmail(username)
      .then((user) => {
        if (user) {
          if (compareSync(password, user.password)) {
            done(null, user);
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  })
);

// Persist user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser((id, done) => {
  authService
    .findOneById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
