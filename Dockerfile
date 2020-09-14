FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV synapse_jwtPrivateKey=mySecureKey

EXPOSE 3000

CMD [ "npm", "start" ]