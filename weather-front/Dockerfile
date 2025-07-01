ARG NODE_VERSION=24.0.0

FROM node:${NODE_VERSION}-alpine AS application

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]