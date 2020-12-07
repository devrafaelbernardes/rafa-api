FROM node:12.13-alpine As rafa-api

WORKDIR /app

COPY package*.json ./

RUN npm i --silent

COPY . .

USER node

EXPOSE 4040

CMD ["npm", "run", "start"]