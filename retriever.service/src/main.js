
const extract = require('./content');
const Service = require('../lib/service.class');

async function process(message) {
	const data = JSON.parse(message);
	const result = extract(data.html);
	return JSON.stringify({ content: result, ...data });
}

async function run() {
	const service = new Service();
	await service.register('addition.html');
	await service.job('addition.html', 'addition.content', process);

}

( async () => await run() )();
