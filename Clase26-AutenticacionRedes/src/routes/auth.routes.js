import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/logout',
    successRedirect: '/auth/success/',
    authType: 'reauthenticate',
  }),
);

router.get('/success/', (req, res) => {
  if (req.isAuthenticated()) {
    !req.user.visitas ? (req.user.visitas = 1) : req.user.visitas++;
    const datosUsuario = {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value,
    };
    res.render('index', { contador: req.user.visitas, data: datosUsuario });
  } else {
    res.render('index', { error: 'Error de autentificacion' });
  }
});

router.get('/logout', (req, res) => {
  const user = req.user?.displayName;
  req.logout();
  res.render('index', { dataLogout: user });
});

export default router;
