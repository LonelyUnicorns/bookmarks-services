
# https://stackoverflow.com/a/3931779
command_exists () {
    type "$1" &> /dev/null ;
}

if ! command_exists docker ; then
	sudo apt-get install docker && sudo apt install docker-compose
fi

docker-compose down
docker-compose kill

cd amqp.lib && npm install
cd ..

#docker-compose up -d --force-recreate --build
