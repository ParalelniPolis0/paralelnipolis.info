export const prerender = true;

import { redirect } from '@sveltejs/kit';

const langs = {
    cs: ['Čeština'],
    en: ['English '],
}

export function load({ params }) {
    const lang = params.lang || 'en'
    if (!lang) {
        return redirect(307, '/')
    }
    return {
        lang
    }
}