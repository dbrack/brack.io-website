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

test('both logo themes and all SVG favicon variants share exactly the same contours and dot', () => {
	const expected = geometry(
		read('brand-waypoint-assets/waypoint-dark.svg').toString()
	);
	assert.equal(expected.length, 2);
	for (const file of [
		'brand/waypoint-light.svg',
		'brand/favicon-dark.svg',
		'brand/favicon-light.svg',
		'favicon.svg',
	]) {
		assert.deepEqual(
			geometry(read(`public/${file}`).toString()),
			expected,
			file
		);
		const svg = read(`public/${file}`).toString();
		const circle = svg.match(
			/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/
		);
		// Favicons place the path group at (119, 36) with a uniform .89 scale;
		// their dot is outside that group and already has the transform applied.
		const favicon = file.includes('favicon');
		if (favicon)
			assert.match(
				svg,
				/transform="translate\(119 36\) scale\(\.89 \.89\)"/
			);
		const dot = favicon
			? [119 + 186 * 0.89, 36 + 214 * 0.89, 35 * 0.89]
			: [186, 214, 35];
		for (let i = 0; i < 3; i++)
			assert.ok(Math.abs(Number(circle[i + 1]) - dot[i]) < 0.0001, file);
	}
	assert.match(
		read('public/favicon.svg').toString(),
		/@media\(prefers-color-scheme:light\)/
	);
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
