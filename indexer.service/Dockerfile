FROM node:latest

WORKDIR /srv

ADD ./indexer.service /srv
ADD ./amqp.lib /srv/lib

#RUN npm install

CMD npm start
