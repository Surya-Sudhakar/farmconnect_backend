import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes); // 👈 MOUNT THE ROUTES HERE
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);


app.get('/', (req, res) => {
  res.send('FarmConnect API is running');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
