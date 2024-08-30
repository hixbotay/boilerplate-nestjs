FROM node:latest

RUN mkdir -p usr/src/app

WORKDIR /usr/src/app

RUN yarn install

EXPOSE 3000

CMD yarn start:dev && tail -f /dev/null