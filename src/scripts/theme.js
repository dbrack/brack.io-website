// Inlined in <head>: resolve the theme before the stylesheet or body can paint.
(() => {
	const key = 'brack.io.theme';
	const root = document.documentElement;
	const systemLight = window.matchMedia('(prefers-color-scheme: light)');
	const normalize = (value) =>
		['dark', 'light', 'system'].includes(value) ? value : 'system';
	let preference = 'system';
	try {
		preference = normalize(localStorage.getItem(key));
	} catch {
		// Storage may be unavailable; the control still works for this visit.
	}

	function applyTheme() {
		const theme =
			preference === 'system'
				? systemLight.matches
					? 'light'
					: 'dark'
				: preference;
		root.dataset.theme = theme;
		root.dataset.themePreference = preference;
		root.style.colorScheme = theme;
		document.querySelector('meta[name="theme-color"]').content =
			theme === 'light' ? '#f5f2ed' : '#0b1016';
		document.querySelector('meta[name="color-scheme"]').content = theme;
		for (const icon of document.querySelectorAll('[data-themed-icon]')) {
			icon.href = `/brand/favicon-${theme}${icon.dataset.themedIcon}`;
		}
		const control = document.getElementById('theme-control');
		if (control) {
			for (const option of control.querySelectorAll(
				'input[name="theme"]'
			)) {
				option.checked = option.value === preference;
			}
			control.hidden = false;
		}
	}

	applyTheme();
	document.addEventListener('DOMContentLoaded', applyTheme, { once: true });
	document.addEventListener('change', (event) => {
		if (!event.target.matches('#theme-control input[name="theme"]')) return;
		preference = normalize(event.target.value);
		try {
			localStorage.setItem(key, preference);
		} catch {
			// Keep the current selection even when persistence is blocked.
		}
		applyTheme();
	});
	systemLight.addEventListener('change', () => {
		if (preference === 'system') applyTheme();
	});
	window.addEventListener('storage', (event) => {
		if (event.key !== key && event.key !== null) return;
		preference = normalize(event.newValue);
		applyTheme();
	});
})();
