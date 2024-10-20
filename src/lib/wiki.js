import { parse as mdParse } from "marked";
import { glossary, linkRegExp } from "$lib/data.js";
import { escapeRegExp } from "./utils.js";

function findItem(arr, key, link = null) {
    return arr.find(g => {
        const names = [g.id, g.name, ...(g.keywords || [])].map(n => escapeRegExp(n))
        const re = new RegExp(`^(${names.join('|')})$`, 'i')
        return link ? link.match(re) : key.match(re)
    })
}

function processLinks(md) {
    return md.replace(linkRegExp, (m, key, link = null) => {
        const item = findItem(glossary, key, link)
        if (item) {
            return `[${key}](/t/${item.id})`
        }
        return `<span class="invalid-link">${key}</span>`
    })
}

/*export function findLinks(md) {
    const m = md.match(LINK_REGEXP)
    console.log(m)
}*/

export function parse(str) {
    return mdParse(processLinks(str))
}