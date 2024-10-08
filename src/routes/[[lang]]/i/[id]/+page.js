import { error } from '@sveltejs/kit';
import { instances } from "$lib/data.js";

export async function load({ params }) {

    const item = instances.find((p) => p.id === params.id);
    if (!item) {
        return error(404, 'Not found');
    }
    return {
        item
    }
}