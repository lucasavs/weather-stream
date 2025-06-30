import { query } from '../../db';

type cityCandlestickData = {
  openTemperature: number,
  closeTemperature: number,
  maxTemperature: number,
  minTemperature: number,
  date: Date
}[]

export type cityTemperatureData = {
  city: string,
  timestamp: string,
  temperature: number,
}

class CandleStickService {
  async getAllCities() {
    throw new Error('Not Implmented')
  }

  async getByCity(cityName: string): Promise<cityCandlestickData> {
    const cityData = await query('SELECT * FROM city_status WHERE city = $1', [cityName]);

    return cityData.rows
  }

  async addCityData(cityTemperatureData: cityTemperatureData): Promise<void> {
    console.log(cityTemperatureData)
    const city = cityTemperatureData.city.toLowerCase();
    const temperature = cityTemperatureData.temperature;
    const eventDate = new Date(cityTemperatureData.timestamp)
    eventDate.setMilliseconds(0)
    eventDate.setSeconds(0)
    eventDate.setMinutes(0)
    await query(`INSERT INTO city_status AS target (time, city, open_value, close_value, max_temperature, min_temperature)
                     VALUES ($1, $2, $3, $3, $3, $3) ON CONFLICT (city, time) DO 
                     UPDATE SET (close_value, max_temperature, min_temperature) = 
                     ($3, GREATEST(target.max_temperature, $3), LEAST(target.min_temperature, $3)) WHERE target.city = $2 AND target.time = $1`,
    [eventDate.toISOString(), city, temperature])
  }
}

export default new CandleStickService()