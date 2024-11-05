import { archive } from '$lib/data.js';

export function entries() {
    return archive.map(i => ({ id: i.id, slug: i.slug }));
}

export const prerender = true;