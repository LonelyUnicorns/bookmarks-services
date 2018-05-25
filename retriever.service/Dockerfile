FROM node:latest

WORKDIR /srv

ADD ./services/retriever /srv
ADD ./services/amqp.lib /srv/lib

#RUN npm install

CMD npm start
