FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g truffle

COPY . .

RUN truffle compile

CMD ["truffle", "migrate", "--network", "ropsten"]