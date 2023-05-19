import { linear } from 'svelte/easing';

/**
 * Adds the base and from classes to the node.
 * After the first tick, removes the from classes and adds the to classes.
 * Svelte delay and duration handle when the first tick fires and when the
 * transition is considered to be complete. The supplied duration should be
 * set to match the duration of the css transitions and animations that
 * will be applied by the changing classes.
 *
 * @export
 * @param {Element} node
 * @param {import('./types').ClassesParams} params
 * @returns {import('svelte/types/runtime/transition').TransitionConfig}
 */
export function classes(node, { delay = 0, duration = 400, base = '', from = '', to = '' } = {}) {
	const baseClasses = base ? base.split(' ') : [];
	const fromClasses = from ? from.split(' ') : [];
	const toClasses = to ? to.split(' ') : [];
	if (baseClasses.length > 0 || fromClasses.length > 0) {
		node.classList.add(...[...baseClasses, ...fromClasses]);
	}
	let updated = false;
	let completed = false;

	return {
		delay,
		duration,
		easing: linear,
		tick: (t) => {
			const isStart = t !== 1 && t !== 0 && !updated;
			const isEnd = (t === 1 || t === 0) && updated && !completed;
			if (isStart) {
				updated = true;
				if (fromClasses.length > 0) {
					node.classList.remove(...fromClasses);
				}
				if (toClasses.length > 0) {
					node.classList.add(...toClasses);
				}
			}
			if (isEnd) {
				completed = true;
				if (baseClasses.length > 0) {
					node.classList.remove(...baseClasses);
				}
			}
		},
	};
}

export default classes;
