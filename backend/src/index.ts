import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import toursRoutes from './routes/tours';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use('/api/tours', toursRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
