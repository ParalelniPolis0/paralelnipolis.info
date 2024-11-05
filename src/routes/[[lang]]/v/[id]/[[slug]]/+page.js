import { error } from '@sveltejs/kit';
import { archive } from "$lib/data.js";
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {

    const item = archive.find((p) => p.id === params.id);
    if (!item) {
        return error(404, 'Not found');
    }
    if (params.id !== item.id || params.slug !== item.slug) {
        return redirect(307, `/v/${item.id}/${item.slug}`);
    }
    return {
        item
    }
}