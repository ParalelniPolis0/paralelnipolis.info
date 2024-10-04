import { error } from '@sveltejs/kit';
import { events } from "$lib/data.js";

export async function load({ params }) {

    const item = events.find((p) => p.id === params.id);
    if (!item) {
        return error(404, 'Not found');
    }
    return {
        item
    }
}