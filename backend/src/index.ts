import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import toursRoutes from './routes/tours';

dotenv.config();
const app = express();

// ✅ CORS setup — allow only your Vercel frontend & local dev
app.use(cors({
  origin: [
    'https://mapmytour.vercel.app', // your deployed frontend
    'http://localhost:3000'         // local frontend during development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Mount routes
app.use('/api/tours', toursRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
