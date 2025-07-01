ARG NODE_VERSION=24.0.0

# Alpine for some reason have problems connecting with external sources
FROM node:${NODE_VERSION} AS application

WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 8765
CMD ["node", "weather_stream_simulator.js"]