import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  const { quantity } = req.query;

  let arrayNumbers = [];
  for (let i = 0; i < quantity; i++) {
    arrayNumbers.push(Math.floor(Math.random() * 1000));
  }

  res.send(arrayNumbers);
});

export default router;
