import { describe, it, expect } from 'vitest';
import { render, act, fireEvent, screen, waitFor } from '@testing-library/svelte';

import { JSDOM } from 'jsdom';
import { classes } from './index.js';
import Page from '../routes/+page.svelte';

describe('classes test', () => {
	it('returns a TransitionConfig', async () => {
		const dom = new JSDOM();

		const el = dom.window.document.createElement('div');
		const res = classes(el);

		expect(res.delay).toBe(0);
		expect(typeof res.tick).toBe('function');
		expect(typeof res.easing).toBe('function');
	});

	it('updates classes on enter', async () => {
		const { debug } = render(Page, {});
		const button = screen.getByTestId('menu-button');

		await fireEvent.click(button);

		const menu = await screen.findByRole('menu');

		expect(menu.classList.contains('ease-out')).toBeTruthy(
			'Base class ease-out not found on the menu container'
		);
		expect(menu.classList.contains('opacity-0')).toBeTruthy(
			'Transition start class opacity-0 not found on the menu container'
		);
		expect(menu.classList.contains('scale-100')).toBeFalsy(
			'Transition end class scale-100 found on the menu container'
		);

		// TODO unsure of the best way to test transitions here
		// It would be cool to await ticks and a fake timer and
		// check the classes are as expected
		// await act(async () => {
		// 	return new Promise((resolve) => {
		// 		setTimeout(() => {
		// 			resolve();
		// 		}, 50);
		// 	});
		// });
		// expect(menu.classList.contains('ease-out')).toBeTruthy(
		// 	'Base class ease-out not found on the menu container'
		// );
		// expect(menu.classList.contains('scale-100')).toBeTruthy(
		// 	'Transition end class scale-100 not found on the menu container'
		// );
		// expect(menu.classList.contains('opacity-0')).toBeFalsy(
		// 	'Transition start class opacity-0 is still on the menu container'
		// );
	});
});
