# Candlesticks streams

This project is a very simple one. The idea is to consume data from a weather API and display candlesticks with the first temperature measured, the last temperature measured, the max temperature measured and the lowest temperature measured. All the temperatures are condensed in one-hour intervals.

## weather-front
It is the front end of the application. It is a very simple React SPA. It connects with the back end through REST and retrieves the data for one specific city. This application lacks refinement, but you can check the candlestick by going to `http://localhost:3000/[name of the city]`.

## weather-back
It is a Node/Express application that consumes data via websocket, stores this information in a database, and exposes the data through an API to the frontend. The only API available is `http://localhost:3001/api/v1/candlesticks/[name of the city]`, which returns the information to create a candlestick graph.

## database
It is a Postgres database where we store the data for the city's temperature. There is only one table here with the time(day and hour) and the city as unique identifiers. Usually, we would also need to create another table with the cities and have a foreign key in the temperature table, but I decided to do it this way to allow the addition of new cities without worrying about adding new cities to the city table and also to avoid problems with performance due to the joins/

## stream
It is an application that consumes temperature data from an external API and publishes it through a websocket interface.

How to use it
Simply run docker compose up, and all the systems will go online. You can check the collected data through the URL `http://localhost:3000/[name of the city]`. You can also check the API information by going to `http://localhost:3001/api/v1/candlesticks/[name of the city]`. The current cities available are `berlin`, `newyork`, `tokyo`, `saopaulo` and `capetowm`. You can also go to `narnia` if you want to check some mocked data.

## TODOS
- Currently there is no test implemented. Shame on me.
- The front end does not know how to handle empty data and the graph gets confused.
- Need to add auth to the backend.
- I need to work on the behavior of the backend when it loses access to the database.