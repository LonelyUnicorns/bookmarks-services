
const connect = require('./connect');
const DefaultOptions = {
	persistent: true,
	noAck: false,
	timestamp: Date.now(),
	contentEncoding: "utf-8",
	contentType: "application/json"
};

class Service {
	constructor() {
		this.channel = null;
	}

	async register(exchange) {
		const queue = `${exchange}.process`;
		const conn = await connect();

		if (!this.channel) {
			this.channel = await conn.createChannel();
		}

		await this.channel.assertExchange(exchange, 'topic', { durable: true, });
		await this.channel.assertQueue(queue, { durable: true });
		await this.channel.bindQueue(queue, exchange);

		return this;
	}

	async job(source, dest, func) {
		this.channel.consume(`${source}.process`, async (message) => {
			const result = await func(message.content.toString('utf-8'));
			await this.channel.publish(dest, '', Buffer.from(result, 'ascii'));
			await this.channel.ack(message);
		});

		return this;
	}
}

module.exports = Service;
