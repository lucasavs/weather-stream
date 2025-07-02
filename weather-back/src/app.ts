import express, { Express } from 'express';
import ws from 'ws';
import candleStickRoutes from './routes/candleStickRoutes';
import dotenv from 'dotenv';
import candlestickService, { cityTemperatureData } from './services/candlestickService';
import cors from 'cors';

dotenv.config();

// Starting connection with the WS client
const reconnectInterval = 1000 * 5;
const wsConnection = () => {
  const wsClient = new ws(`ws://${process.env.WEATHERSTREAMHOST}:8765`)
  // const wsClient = new ws('ws://localhost:8765');
  wsClient.on('open', function() {
    console.log('socket open');
  });
  wsClient.on('error', function() {
    console.log('socket error');
  });
  wsClient.on('message', (data) => {
    const bufferedData = data.toString();
    const parsedDAta = JSON.parse(bufferedData) as cityTemperatureData;
    candlestickService.addCityData(parsedDAta)
  })
  wsClient.on('close', function() {
    console.log('socket close');
    setTimeout(wsConnection, reconnectInterval);
  });
}
wsConnection()

// TODO: ADD SOME AUTHENTICANTION SERVICE HERE
// Exemple: https://www.npmjs.com/package/express-basic-auth

// starting server
const app: Express = express();
app.use(cors())
app.use('/api/v1/candlesticks', candleStickRoutes)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
