import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const script = readFileSync(
	new URL('../src/scripts/theme.js', import.meta.url),
	'utf8'
);

function boot({ saved = null, light = false, blocked = false } = {}) {
	const events = {};
	const media = {
		matches: light,
		addEventListener: (_, callback) => (events.media = callback),
	};
	const root = { dataset: {}, style: {} };
	const meta = {};
	const options = ['system', 'dark', 'light'].map((value) => ({
		value,
		checked: false,
	}));
	const control = { hidden: true, querySelectorAll: () => options };
	const icons = ['.svg', '-16.png', '-32.png', '-180.png'].map((suffix) => ({
		dataset: { themedIcon: suffix },
	}));
	let ready = false;
	let stored = saved;
	runInNewContext(script, {
		window: {
			matchMedia: () => media,
			addEventListener: (name, callback) => (events[name] = callback),
		},
		document: {
			documentElement: root,
			querySelector: (selector) => (meta[selector] ??= {}),
			querySelectorAll: () => icons,
			getElementById: () => (ready ? control : null),
			addEventListener: (name, callback) => (events[name] = callback),
		},
		localStorage: {
			getItem: () => {
				if (blocked) throw Error('Storage blocked');
				return stored;
			},
			setItem: (_, value) => {
				if (blocked) throw Error('Storage blocked');
				stored = value;
			},
		},
	});
	return {
		root,
		icons,
		control,
		selected: () =>
			options
				.filter((option) => option.checked)
				.map((option) => option.value),
		meta,
		stored: () => stored,
		ready: () => {
			ready = true;
			events.DOMContentLoaded();
		},
		choose: (value) =>
			events.change({ target: { matches: () => true, value } }),
		system: (light) => {
			media.matches = light;
			events.media();
		},
		storage: (value, key = 'brack.io.theme') =>
			events.storage({ key, newValue: value }),
	};
}

test('resolves dark before DOM ready when there is no system light preference', () => {
	const app = boot();
	assert.equal(app.root.dataset.theme, 'dark');
	assert.equal(app.root.style.colorScheme, 'dark');
	assert.equal(app.control.hidden, true);
	app.ready();
	assert.deepEqual(app.selected(), ['system']);
	assert.equal(app.control.hidden, false);
});

test('respects system light before first paint and follows live OS changes', () => {
	const app = boot({ light: true });
	assert.equal(app.root.dataset.theme, 'light');
	app.system(false);
	assert.equal(app.root.dataset.theme, 'dark');
	app.system(true);
	assert.equal(app.root.dataset.theme, 'light');
});

test('saved manual choices override the OS before first paint', () => {
	for (const saved of ['dark', 'light']) {
		const app = boot({ saved, light: saved === 'dark' });
		assert.equal(app.root.dataset.theme, saved);
		app.system(saved === 'dark');
		assert.equal(app.root.dataset.theme, saved);
	}
});

test('manual selection persists, updates all icons and browser chrome, and can return to system', () => {
	const app = boot();
	app.ready();
	app.choose('light');
	assert.equal(app.stored(), 'light');
	assert.deepEqual(app.selected(), ['light']);
	assert.equal(app.meta['meta[name="theme-color"]'].content, '#f5f2ed');
	assert.equal(app.meta['meta[name="color-scheme"]'].content, 'light');
	for (const icon of app.icons)
		assert.equal(
			icon.href,
			`/brand/favicon-light${icon.dataset.themedIcon}`
		);
	app.choose('system');
	assert.equal(app.stored(), 'system');
	assert.equal(app.root.dataset.theme, 'dark');
});

test('blocked storage still allows selection and live system mode', () => {
	const app = boot({ blocked: true });
	app.ready();
	app.choose('light');
	assert.equal(app.root.dataset.theme, 'light');
	app.choose('system');
	app.system(true);
	assert.equal(app.root.dataset.theme, 'light');
});

test('invalid storage falls back to system; cross-tab changes and clearing storage synchronize', () => {
	const app = boot({ saved: 'invalid', light: true });
	assert.equal(app.root.dataset.theme, 'light');
	app.storage('dark');
	assert.equal(app.root.dataset.theme, 'dark');
	app.storage('light', 'unrelated');
	assert.equal(app.root.dataset.theme, 'dark');
	app.storage(null, null);
	assert.equal(app.root.dataset.theme, 'light');
});
