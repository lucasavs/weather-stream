ARG NODE_VERSION=24.0.0

FROM node:${NODE_VERSION}-alpine AS application

WORKDIR /app
COPY package*.json .
COPY . .
COPY .env.sample .env
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/app.js"]