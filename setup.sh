
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
	source .nvm/nvm.sh
	nvm install 10
	nvm alias default 10
fi

cd amqp.lib && npm install
cd ..

if ! file_exists ./config.js ; then
	mv config.js.example config.js
fi

docker-compose down
docker-compose kill

#sudo docker-compose up -d --force-recreate --build
