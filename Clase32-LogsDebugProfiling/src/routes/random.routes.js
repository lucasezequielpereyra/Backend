import { Router } from 'express';
import { fork } from 'child_process';
const router = Router();

router.get('/', (req, res) => {
  logger.info.info('GET: se ha accedido a ' + req.url);

  const quantity = Number(req.query.cant) || 100000000;

  if (req.query.cant < 0 || req.query.cant > 1000) {
    res.status(400).json({
      msg: 'El numero ingresado tiene que ser del 1 al 1000',
    });
    return;
  }
  const cantidad = fork('./src/child.js');
  cantidad.send({ cantidad: quantity });
  cantidad.on('message', contador => {
    res.json(contador);
  });
});

export default router;
