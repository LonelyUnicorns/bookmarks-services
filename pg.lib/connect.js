
const knex = require('knex');


async function connect() {
	return knex({
		client: 'pg',
		version: '7.2',
		connection: {
			host : '',
			user : '',
			password : '',
			database : ''
		},
		pool: {
			min: 0,
			max: 7,
		}
	});
}

module.exports = connect;
