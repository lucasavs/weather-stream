import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react'; 
import axios from 'axios';

export default function App() {
    const city = window.location.href.split("/").at(-1)
    
    const [responseData, setResponseData] = useState([]);
    const getResponseData = async() => {
        // TODO: Set this path as env variable
        const response = await axios.get(`http://localhost:3001/api/v1/candlesticks/${city}`)
        setResponseData( response.data )
    }

    useEffect(() => {
        getResponseData()
    }, [])

    const XaxisData: string[] = []
    const candlestickData: any[][] = []
    responseData.forEach((element: { time: string; open_value: any; close_value: any; min_temperature: any; max_temperature: any; }) => {
        XaxisData.push(element.time)
        candlestickData.push([
            element.open_value, element.close_value, element.min_temperature, element.max_temperature
        ])
    });

  return (
    <div className="App">
      <ReactECharts
        key={Date.now()}
        theme="light"
        option={{
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
          },
            grid: {},
            xAxis: {
                data: XaxisData,
            },
            yAxis: {},
            series: [
            {
                type: 'candlestick',
                data: candlestickData,
            }]
        }}
        style={{ width: "100%", height: 400 }}
      />
    </div>
  );
}
