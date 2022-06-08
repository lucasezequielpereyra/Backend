import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const uploadAvatar = multer({ dest: 'public/assets/uploads/' });

router.post('/signup', [uploadAvatar.single('file')], AuthController.signUp);

// login with passport
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/succesredirect',
    failureRedirect: '/auth/failureredirect',
  }),
);
router.get('/failureredirect', (req, res) => {
  res.status(400).render('index');
});
router.get('/succesredirect', AuthController.succesredirect);
router.get('/logout', AuthController.signOut);
router.get('/register', (req, res) => {
  res.render('register');
});

export default router;
