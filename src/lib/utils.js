export { filesize } from "filesize"

export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function shortText(str, maxSize = 400) {
    if (str.length > maxSize) {
        return str.substr(0, maxSize) + "..";
    }
    return str;
}

export function imgHashUrl(type, hash, size = "s") {
    return `https://atlas.pp0.co/img/${type}/${size}/${hash}.webp`
}

export function imgSourceUrl(type, path) {
    return `https://atlas.pp0.co/img/${type}/${path}`
}

export function archiveStorageUrl(path) {
    return `https://archive.pp0.co/${path}`
}

const langMatrix = {
    cs: '🇨🇿',
    en: '🇬🇧',
}
export function langToFlag(lang) {
    if (langMatrix[lang]) {
        return langMatrix[lang]
    }
    return lang
}