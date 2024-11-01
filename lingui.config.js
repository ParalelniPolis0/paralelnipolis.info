import { jstsExtractor, svelteExtractor } from "svelte-i18n-lingui/extractor";

export default {
    locales: ["en", "cs", "zu"],
    pseudoLocale: "zu",
    format: "po",
    fallbackLocales: {
        zu: "en"
    },
    catalogs: [
        {
            path: "./locales/{locale}/messages",
            include: ["./src"],
        },
    ],
    sourceLocale: "en",
    extractors: [jstsExtractor, svelteExtractor],
};