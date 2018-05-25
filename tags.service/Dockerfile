FROM node:latest

WORKDIR /srv

ADD ./tags.service /srv
ADD ./amqp.lib /srv/lib

RUN npm install

CMD npm start
