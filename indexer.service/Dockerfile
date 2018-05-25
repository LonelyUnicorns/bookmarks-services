FROM node:latest

WORKDIR /srv

ADD ./services/indexer /srv
ADD ./services/amqp.lib /srv/lib

#RUN npm install

CMD npm start
