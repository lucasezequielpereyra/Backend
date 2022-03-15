import express from 'express';
import morgan from 'morgan';
import productsRoute from './routes/products.route';
import cartRoute from './routes/cart.route';
import './class/firebase.container';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);

export default app;
