import { Router } from 'express';
import { getTours, getTourById, postBooking } from '../controllers/toursController';

const router = Router();

router.get('/', getTours);
router.get('/:id', getTourById);
router.post('/book', postBooking);

export default router;
