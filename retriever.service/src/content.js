
const fs = require('fs');
const path = require('path');


const Parser = require('fast-html-parser');
const { createSome, createNone, } = require('option-t/cjs/Option');

const SelectorPresets = ['.content', '.section-content', '#content', '.article-content'];
const MetaRules =
	[{
		lookupFor: 'title',
		key: 'name',
		value: 'content',
	},
	{
		lookupFor: 'description',
		key: 'name',
		value: 'content',
	},
	{
		lookupFor: 'keywords',
		key: 'name',
		value: 'content',
	}
];

function extractMetaInfo(keys, source) {
	return MetaRules
		.map(rule => {
			let found = source.find(i => i[rule.key] && i[rule.key] === rule.lookupFor);
			return found ? { [rule.lookupFor]: found[rule.value] } : { [rule.lookupFor]: null };
		})
		.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function extractContent(rootNode) {
	return tryPresets(rootNode) || extractLargest(rootNode);
}

function tryPresets(rootNode) {
	const result = SelectorPresets
		.map(item => rootNode.querySelectorAll(item))
		.filter(content => content !== null)
		.map(node => node.map(item => item.text).join(' '))
		.reduce((acc, text) => acc.concat(text), '');

	return result || null;
}

function extractLargest(rootNode) {
	const body = rootNode.querySelector('body');
	const textBlocks = body.childNodes
		.map(node => node.text)
		.sort((a, b) => a.length < b.length ? 1 : -1)

	return textBlocks.length ? textBlocks[0] : null;
}

function getIcon(rootNode) {
	const iconNode = rootNode
		.querySelectorAll('link')
		.find(link => link.attributes.rel === 'shortcut icon');

	return iconNode ? iconNode.attributes.href : null;
}

function extract(html) {
	const rootNode = Parser.parse(html);
	const metaTags = rootNode.querySelectorAll('meta');
	const title = rootNode.querySelector('title').text;
	const attrs = metaTags.map(t => t.attributes);
	const meta = extractMetaInfo(['title', 'description'], attrs);

	const content = extractContent(rootNode);
	const icon = getIcon(rootNode);

	return {
		meta,
		icon,
		title,
		content,
	};
}

module.exports = extract;
