import { error, redirect } from '@sveltejs/kit';
import { articles } from "$lib/data.js";

export async function load({ params }) {

    const parsedId = params.id.split('-')[0];
    const item = articles.find((p) => p.id.match(new RegExp(`^${parsedId}`)));
    if (!item) {
        return error(404, 'Not found');
    }
    if (params.id !== item.slugId) {
        return redirect(308, `/a/${item.slugId}`)
    }

    return {
        item
    }
}