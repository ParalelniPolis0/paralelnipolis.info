
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