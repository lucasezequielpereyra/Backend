import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/auth.service';
import logger from './winston';
let authService = new AuthService();

passport.use(
  new LocalStrategy((username, password, done) => {
    authService
      .findUserByEmail(username)
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!authService.comparePassword(password, user[0].password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user[0]);
      })
      .catch(err => {
        logger.error.error(err);
        return done(err);
      });
  }),
);

// Persist user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser((id, done) => {
  authService
    .findUserById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      logger.error.error(err);
      done(err);
    });
});
