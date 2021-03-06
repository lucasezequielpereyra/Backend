import { compareSync } from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as authService from '../services/auth.service';
import logger from './winston';

passport.use(new LocalStrategy((username, password, done) => {}));

// Persist user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser((id, done) => {
  authService
    .findOneById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      logger.error.error(err);
      done(err);
    });
});
