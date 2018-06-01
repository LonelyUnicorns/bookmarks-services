#! /bin/sh


# https://stackoverflow.com/a/3931779
command_exists () {
    type "$1" &> /dev/null ;
}

sudo apt-get update

if ! command_exists wget ; then
	sudo apt-get install -y wget --no-install-recommends
fi

if ! command_exists google-chrome-unstable ; then
# See https://crbug.com/795759
	sudo apt-get install -yq libgconf-2-4
	wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	    && sudo apt-get update \
	    && sudo apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
	      --no-install-recommends \
	    && rm -rf /var/lib/apt/lists/* \
	    && apt-get purge --auto-remove -y curl \
	    && rm -rf /src/*.deb
fi
