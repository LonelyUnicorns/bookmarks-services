FROM node:latest

WORKDIR /srv

ADD ./services/tags /srv
ADD ./services/amqp.lib /srv/lib

#RUN npm install

CMD npm start
