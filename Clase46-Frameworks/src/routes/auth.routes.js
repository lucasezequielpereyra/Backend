import koaRouter from 'koa-router';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';

const router = new koaRouter({ prefix: '/auth' });

router.post('/signup', AuthController.signUp);

// login with passport
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/succesredirect',
    failureRedirect: '/auth/failureredirect',
  }),
);
router.get('/failureredirect', ctx => {
  ctx.body = 'Login failed';
});
router.get('/succesredirect', ctx => {
  ctx.body = 'Login success';
});
router.get('/logout', AuthController.signOut);

export default router;
