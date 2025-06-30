import express, { Express } from 'express';
import ws from 'ws';
import candleStickRoutes from './routes/candleStickRoutes';
import dotenv from 'dotenv';
import candlestickService, { cityTemperatureData } from './services/candlestickService';

dotenv.config();

// Starting connection with the WS client
const reconnectInterval = 1000 * 60;
const wsConnection = () => {
  const wsClient = new ws('ws://localhost:8765');
  wsClient.on('open', function() {
    console.log('socket open');
  });
  wsClient.on('error', function() {
    console.log('socket error');
  });
  wsClient.on('message', (data) => {
    // console.log(data.toString())
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


// starting server
const app: Express = express();
app.use('/api/v1/candlesticks', candleStickRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
