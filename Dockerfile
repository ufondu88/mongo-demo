FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV synapse_jwtPrivateKey=mySecureKey
ENV DB_USER=uzoufondu
ENV DB_PASS=123Mongodb

EXPOSE 3000

CMD [ "npm", "start" ]