
const extract = require('./content');
const Service = require('../lib/service.class');

async function process(message) {
	const data = JSON.parse(message);
	return extract(message.content.toString('utf-8'));
}

async function run() {
	console.info('Running');

	const service = new Service();
	await service.register('addition.html');
	await service.job('addition.html', 'addition.content', process);

}

( async () => await run() )();
