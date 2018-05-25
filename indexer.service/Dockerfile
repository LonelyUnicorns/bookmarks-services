FROM node:latest

WORKDIR /srv

ADD ./indexer.service /srv
ADD ./amqp.lib /srv/lib
ADD ./config /srv

#RUN npm install

CMD npm start
