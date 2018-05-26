
# https://stackoverflow.com/a/3931779
command_exists () {
    type "$1" &> /dev/null ;
}

file_exists () {
    cat "$1" &> /dev/null ;
}

if ! command_exists docker ; then
	sudo apt-get install docker && sudo apt install docker-compose
fi

if ! command_exists nvm ; then
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
	source $HOME/.nvm/nvm.sh
	nvm install 10
	nvm alias default 10
fi

if ! command_exists yarn ; then
	npm install yarn -g
fi

if ! file_exists amqp.lib/yarn.lock ; then
	cd amqp.lib && yarn install
	cd ..
fi

if ! file_exists ./config.js ; then
	mv config.js.example config.js
fi

sudo docker-compose down
sudo docker-compose kill

sudo docker-compose up -d --force-recreate --build
