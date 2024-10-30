import { error } from '@sveltejs/kit';
import { archive } from "$lib/data.js";
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {

    const item = archive.find((p) => (p.id === params.id) || (params.id === p.slug));
    if (!item) {
        return error(404, 'Not found');
    }
    if (item.id !== params.id) {
        return redirect(307, `/v/${item.id}`);
    }
    return {
        item
    }
}