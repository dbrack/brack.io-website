import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url));
const geometry = (svg) =>
	[...svg.matchAll(/<path\b[^>]*>/g)].map((match) => match[0]);

test('all published supplied assets remain byte-identical to the approved pack', () => {
	for (const file of readdirSync(
		new URL('../public/brand/', import.meta.url)
	)) {
		assert.deepEqual(
			read(`public/brand/${file}`),
			read(`brand-waypoint-assets/${file}`),
			file
		);
	}
	assert.deepEqual(
		read('public/favicon.ico'),
		read('brand-waypoint-assets/favicon.ico')
	);
});

test('both logo themes and supplied SVG favicons share the approved contours and dot', () => {
	const master = read('brand-waypoint-assets/waypoint-dark.svg').toString();
	const expected = geometry(master);
	const dot = master.match(/<circle\b[^>]*>/)[0];
	assert.equal(expected.length, 2);
	for (const file of [
		'waypoint-dark.svg',
		'waypoint-light.svg',
		'favicon-dark.svg',
		'favicon-light.svg',
	]) {
		const svg = read(`public/brand/${file}`).toString();
		assert.deepEqual(geometry(svg), expected, file);
		assert.equal(svg.match(/<circle\b[^>]*>/)[0], dot, file);
		assert.match(svg, /viewBox="0 0 277 471"/, file);
		assert.doesNotMatch(svg, /transform=/, file);
	}
});

test('social preview has the promised dimensions and manifest icons exist at declared sizes', () => {
	const pngSize = (buffer) =>
		`${buffer.readUInt32BE(16)}x${buffer.readUInt32BE(20)}`;
	assert.equal(
		pngSize(read('public/brand/social-preview-1200x630.png')),
		'1200x630'
	);
	for (const icon of JSON.parse(read('public/site.webmanifest')).icons) {
		assert.equal(pngSize(read(`public${icon.src}`)), icon.sizes);
	}
});
