import peopleSrc from '$lib/../data/people.yaml';
import projectsSrc from '$lib/../data/projects.yaml';
import configSrc from '$lib/../data/config.yaml';
import friendsSrc from "$lib/../data/friends.yaml";
import instancesSrc from '$lib/../data/instances.yaml';
import guildsSrc from '$lib/../data/guilds.yaml';
import topicsSrc from '$lib/../data/topics.yaml';
import glossarySrc from '$lib/../data/glossary.yaml';

import genYtOld from '$lib/../data/gen/yt-old.json';
import genYtNew from '$lib/../data/gen/yt-new.json';
import genYtDtpEthPrague22 from '$lib/../data/gen/yt-dtp-ethprague22.json';
import genYtDtpEthPrague23 from '$lib/../data/gen/yt-dtp-ethprague23.json';
import genYtOthers from '$lib/../data/gen/yt-others.json';
import genMeetup from '$lib/../data/gen/meetup.json';
import genArticlesSrc from '$lib/../data/gen/articles.json';

export const pkg = __PACKAGE__;
export const build = __BUILD__;

export const config = configSrc;

export const projects = projectsSrc;
export const friends = friendsSrc;
export const instances = instancesSrc;
export const guilds = guildsSrc;
export const topics = topicsSrc;
export const glossary = glossarySrc;

export const articles = genArticlesSrc;

export const events = projectsSrc.map(p => p.events?.map(e => {
    e.project = p.id;
    return e;
})).filter(e => e).concat(genMeetup).flat().sort((x, y) =>
    y.date > x.date ? 1 : -1,
);

export const archive = [
    genYtDtpEthPrague22,
    genYtDtpEthPrague23,
    genYtNew,
    genYtOld,
    genYtOthers
].flat().sort((x, y) =>
    y.publishedAt > x.publishedAt ? 1 : -1,
);

export const people = peopleSrc.map(p => {
    p.merit = Number((p.roles?.length || 0) * 3) +
        (events.filter(e => e.speakers?.includes(p.id)).length * 1) +
        (archive.filter(i => i.people?.includes(p.id)).length * 2)
    return p
}).sort((x, y) => y.merit > x.merit ? 1 : -1);