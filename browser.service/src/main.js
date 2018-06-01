
const Service = require('../lib/service.class');
const puppeteer = require('puppeteer');

async function browse({ url }) {
	// Url validation
	console.log('url', url);

	const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle2' });
	const result = await page.content();
	await page.close();
	await browser.close();
	return result;
}

async function process(message) {
	const data = JSON.parse(message);
	return await browse(data);
}

async function run() {
	console.info('Running');

	const service = new Service();
	await service.register('addition.push');
	await service.job('addition.push', 'addition.html', process);

}

( async () => await run() )();
