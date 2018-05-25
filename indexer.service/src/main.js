
//const connect = require('../../share/connect');
const Service = require('../../service.class');
const elastic = require('elasticsearch');

const client = new elastic.Client({
  host: '18.191.37.13:9200',
  log: 'trace'
});

//client.ping({ requestTimeout: 3000 });

async function createIndex({ id }) {
	const result = await client.create({
		index: 'test',
		type: 'test',
		id: id,
		body: {

		},
	});

	console.log('Search result', result);
}

async function process(message) {
	const data = JSON.parse(message);
	console.log(data.keywords, data.summary, data.meta, data.title);
	return {};
}

async function run() {
	console.info('Running');

	const service = new Service();
	await service.register('addition.indexing');
	await service.job('addition.indexing', 'addition.content', process);

}

( async () => await run() )();
