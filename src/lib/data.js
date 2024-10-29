import { escapeRegExp } from './utils.js';

import atlas from '$lib/../data/atlas.json';

import peopleSrc from '$lib/../data/people.yaml';
import configSrc from '$lib/../data/config.yaml';
import topicsSrc from '$lib/../data/topics.yaml';

import genArticlesSrc from '$lib/../data/gen/articles.json';
import genGlossarySrc from '$lib/../data/gen/glossary.json';

import { VideoCamera, User, Tag, Ticket, BuildingLibrary } from "svelte-heros-v2";

export const pkg = __PACKAGE__;
export const build = __BUILD__;

export const config = configSrc;

export const topics = topicsSrc;
export const articles = genArticlesSrc;

export const linkRegExp = /\[\[([^\|\]]+)\|?([^\]]*)\]\]/g;

//const glossaryResp = await fetch("https://glossary.pp0.co")
//export const glossary = (await glossaryResp.json()).glossary.en;
export const glossary = genGlossarySrc.glossary.en;

export const events = atlas.events;
export const structures = atlas.structures;
export const archive = atlas.archive;

export const projects = structures.map(s => s.projects?.map(p => {
    p.structure = s.id;
    return p
}) || []).flat();

/*export const events = projectsSrc.map(p => p.events?.map(e => {
    e.project = p.id;
    return e;
})).filter(e => e).concat(genMeetup).flat().sort((x, y) =>
    y.date > x.date ? 1 : -1,
);*/

/*export const archive = [
    genYtDtpEthPrague22,
    genYtDtpEthPrague23,
    genYtNew,
    genYtOld,
    genYtW3PN,
    genYtOthers
].flat().sort((x, y) =>
    y.publishedAt > x.publishedAt ? 1 : -1,
);*/

export const people = peopleSrc.map(p => {
    p.merit = Number((p.roles?.length || 0) * 3) +
        (events.filter(e => e.speakers?.includes(p.id)).length * 1) +
        (archive.filter(i => i.people?.map(p => p.split('|').at(-1)).includes(p.id)).length * 2)
    return p
}).sort((x, y) => y.merit > x.merit ? 1 : -1);

export function searchDataset() {
    const items = []
    for (const x of glossary) {
        items.push({
            id: x.id,
            name: x.name,
            baseUrl: `/t/${x.id}`,
            icon: Tag,
            description: x.type + ' (glossary)',
            keywords: x.keywords,
            termName: x.name,
            fullDescription: x.description,
        })
    }
    for (const x of projects) {
        const keywords = []
        if (x.altNames) {
            keywords.push(...x.altNames)
        }
        items.push({
            id: x.id,
            name: x.name,
            termName: x.name,
            shortname: x.shortname,
            type: 'concept',
            baseUrl: `/c/${x.id}`,
            img: `/gimg/projects/s/${x.id}.webp`,
            keywords,
            description: 'Concept',
        })
    }
    for (const x of structures) {
        const keywords = [x.id]
        if (x.altNames) {
            keywords.push(...x.altNames)
        }
        items.push({
            id: x.id,
            name: x.name,
            type: 'instance',
            baseUrl: `/i/${x.id}`,
            img: `/gimg/instances/s/${x.id}.webp`,
            keywords,
            description: 'Instance',
        })
    }
    for (const x of people) {
        const keywords = x.refs?.twitter ? [x.refs.twitter] : []
        if (x.altNames) {
            keywords.push(...x.altNames)
        }
        items.push({
            id: x.id,
            name: x.name,
            termName: x.name,
            handle: x.name,
            type: 'person',
            baseUrl: `/p/${x.id}`,
            //icon: User,
            img: `/gimg/people/s/${x.id}.webp`,
            keywords,
            description: x.caption || 'Person',
        })
    }
    for (const x of events) {
        items.push({
            id: x.id,
            name: x.name,
            type: 'event',
            baseUrl: `/e/${x.id}`,
            icon: Ticket,
            description: 'Event'
        })
    }
    for (const x of archive) {
        items.push({
            id: x.id,
            name: x.name,
            type: 'archive',
            baseUrl: `/v/${x.id}`,
            icon: VideoCamera,
            keywords: x.people || [],
            description: 'Video' //,x.people?.join(', '),
        })
    }
    return items
}