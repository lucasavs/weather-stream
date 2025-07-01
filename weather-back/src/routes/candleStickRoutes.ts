import { Router } from 'express';
import CandleStickController from  '../controllers/candlestickController';

const router = Router()

const candleStickController = new CandleStickController()

router.get('/', candleStickController.getAllCities);
router.get('/narnia', candleStickController.getMockedCity);
router.get('/:city', candleStickController.getByCity);

export default router