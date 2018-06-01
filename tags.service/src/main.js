
const algorithmia = require('algorithmia');
const Service = require('../lib/service.class');

const ALGORITHMIA_API_KEY = 'simQh1qIabk/DbTSNw/Jskv+WjN1';
const KEYWORDS_ALGORITHM = 'nlp/AutoTag/1.0.1';
const SUMMARIZER_ALGORITHM = 'nlp/Summarizer/0.1.7';

( async () => await run() )();

async function process(message) {
	const data = JSON.parse(message);
	const { content } = data;
	const client = algorithmia(ALGORITHMIA_API_KEY);
	const keywords = await client.algo(KEYWORDS_ALGORITHM).pipe(content);
	const summary = await client.algo(SUMMARIZER_ALGORITHM).pipe(content);
	return {
		keywords: keywords.result,
		summary: summary.result,
		...data,
	};
}

async function run() {
	const service = new Service();
	await service.register('addition.content');
	await service.job('addition.content', 'addition.indexing', process);

}

( async () => await run() )();
