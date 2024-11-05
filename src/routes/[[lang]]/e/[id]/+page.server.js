import { events } from '$lib/data.js';

export function entries() {
    return events.map(i => ({ id: i.id }));
}

export const prerender = true;