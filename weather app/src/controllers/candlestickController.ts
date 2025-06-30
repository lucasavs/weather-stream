import { Request, Response } from 'express';
import candleStickService from '../services/candlestickService';

class CandleStickController {
  async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const allCandlesticks = await candleStickService.getAllCities();
      res.status(200).json(allCandlesticks)
    } catch (error) {
      // change this to something else if moving to production
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getByCity(req: Request, res: Response): Promise<void> {
    try {
      const candlesticks = await candleStickService.getByCity(req.params.city);
      res.status(200).json(candlesticks)
    } catch (error) {
      // change this to something else if moving to production
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default CandleStickController