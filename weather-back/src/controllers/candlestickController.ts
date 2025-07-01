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

  async getMockedCity(req: Request, res: Response): Promise<void> {
    const mockedData = [
      {
        time: 'Jan, 29 Jun 2000 23:00:00 GMT',
        open_value: 20,
        close_value: 30,
        min_temperature: 18,
        max_temperature: 35
      },
      {
        time: 'Feb, 01 Jun 2000 00:00:00 GMT',
        open_value: 15,
        close_value: 25,
        min_temperature: 12,
        max_temperature: 28
      },
      {
        time: 'Feb, 01 Jun 2000 01:00:00 GMT',
        open_value: 18,
        close_value: 27,
        min_temperature: 15,
        max_temperature: 31
      },
      {
        time: 'Feb, 01 Jun 2000 02:00:00 GMT',
        open_value: 19,
        close_value: 29,
        min_temperature: 17,
        max_temperature: 39
      }
    ]
    res.status(200).json(mockedData)
  }
  
}

export default CandleStickController