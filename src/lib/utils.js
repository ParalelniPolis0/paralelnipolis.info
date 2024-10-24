
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function shortText(str, maxSize = 400) {
    if (str.length > maxSize) {
        return str.substr(0, maxSize) + "..";
    }
    return str;
}