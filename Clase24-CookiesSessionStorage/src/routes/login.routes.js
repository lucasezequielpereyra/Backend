import { Router } from 'express';

import path from 'path';

const router = new Router();

router.get('/', (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.visitas ? req.session.visitas++ : (req.session.visitas = 1);
    res.render('index', {
      data: req.session,
    });
  } else {
    res.render('index');
  }
});

router.get('/logout', (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy(err => {
      if (!err) {
        res.render('index', { dataLogout: nombre });
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

router.post('/login', (req, res) => {
  req.session.nombre = req.body.nombre;
  req.session.visitas = 1;
  res.redirect('/');
});

export default router;
