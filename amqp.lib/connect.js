
const amqplib = require('amqplib');

const ATTEMPT_INTERVAL = 1000;

async function connect(url) {
	const connectionUrl = url || 'amqp://rabbitmq:rabbitmq@18.216.104.191:5672';

	let attemptCount = 20;
	while (attemptCount > 0) {
		try {
			const conn = await amqplib.connect(connectionUrl);
			return conn;
		} catch(err) {
			attemptCount--;
			console.error(err);
			await sleep(ATTEMPT_INTERVAL);
		}
	}

	console.error('Cannot connect to RabbitMQ server');
	process.exit(1);
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = connect;
