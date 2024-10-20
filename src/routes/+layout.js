export const prerender = true;

import { redirect } from '@sveltejs/kit';

const langs = {
    cs: ['Čeština'],
    en: ['English'],
    zu: ['Pseudo'],
}

export async function load({ params }) {
    const lang = params.lang || 'en'
    if (!lang || !langs[lang]) {
        return redirect(307, '/')
    }
    const { messages } = await import(`$lib/../../locales/${lang}/messages.ts`);
    return {
        lang,
        messages
    }
}