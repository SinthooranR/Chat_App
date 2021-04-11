FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install react-scripts@4.0.2 -g

COPY . .

CMD ["npm", "start"]