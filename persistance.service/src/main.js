
const Service = require('../../service.class');

async function process(message) {
	const data = JSON.parse(message);
	console.log(data);


	return 'https://en.wikipedia.org/wiki/Computer_science';
}

async function run() {
	console.info('Running');

	const service = new Service();
	await service.register('addition.persistance');
	await service.job('addition.persistance', 'addition.push', process);
}

( async () => await run() )();
