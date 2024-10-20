import { bundle } from "./data.js";

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const glossary = bundle.glossary
const linkRegExp = /\[\[([^\|\]]+)([^\]]*)\]\]/g;

const links = {}
const missingLinks = []

glossary.map(g => {
    const links = g.description.matchAll(linkRegExp);
    [...links].map(l => {

        const key = l[1];
        const link = l[2] ? l[2].substring(1) : null;
        const targetObj = glossary.find(g => {
            const names = [g.id, g.name, ...(g.keywords || [])].map(escapeRegExp)
            const re = new RegExp(`^(${names.join('|')})$`, 'i')
            //console.log(re)
            return link ? link.match(re) : key.match(re)
        })

        if (!targetObj) {
            const rkey = link || key
            const missingLink = missingLinks.find(i => i.key === rkey)
            if (missingLink) {
                missingLink.pages.push(g.id)
            } else {
                missingLinks.push({
                    key,
                    pages: [g.id]
                })
            }
        }
        //return { key, link, target: targetObj?.id || null }
    })
});

const sorted = missingLinks.sort((x, y) => x.pages.length > y.pages.length ? 1 : -1)
for (const i of sorted) {
    console.log(`[${i.key}] (${i.pages.length}): ${i.pages.join(',')}`)
}