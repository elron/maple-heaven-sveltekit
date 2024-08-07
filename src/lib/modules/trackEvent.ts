import { dev } from '$app/environment';

export function trackEvent(eventType: string, parameters: any = '') {
	const extraParams = {};

	const sentParams = flattenObject({ ...parameters, ...extraParams });

	console.log(
		'%cPlausable trackEvent',
		'background:rgb(79,70,229); color:white',
		`"${eventType}"`,
		sentParams
	);

	if (dev) return;
	plausible(eventType, parameters ? { props: sentParams } : null);
}

// Why flatten?
// Because that's what plasuable accepts:
// "Custom properties only accept scalar values such as strings, numbers and booleans. Data structures such as objects, arrays etc. aren't accepted."
// Source: https://plausible.io/docs/custom-event-goals

function flattenObject(obj, parentKey = '', result = {}) {
	for (const [key, value] of Object.entries(obj)) {
		const currentKey = parentKey ? `${parentKey}.${key}` : key;

		if (Array.isArray(value)) {
			result[currentKey] = value.join(', ');
		} else if (typeof value === 'object' && value !== null) {
			flattenObject(value, currentKey, result);
		} else {
			result[currentKey] = String(value);
		}
	}
	return result;
}