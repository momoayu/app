FROM node:20-alpine

WORKDIR /code/frontend

COPY ./frontend /code/frontend

RUN npm install
RUN npm run build

CMD ["npm", "start"]