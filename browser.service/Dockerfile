FROM node:latest

WORKDIR /srv

ADD ./browser.service /srv
ADD ./amqp.lib /srv/lib
ADD ./config.js /srv
ADD ./install.sh /srv

RUN chmod +x install.sh
RUN ./install.sh

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN npm install

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser ./node_modules

USER pptruser

ENTRYPOINT ["dumb-init", "--"]

CMD npm start
