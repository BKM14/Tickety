FROM node:20.18-bookworm

WORKDIR /ui

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]