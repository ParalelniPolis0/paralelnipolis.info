
import genYtOld from '$lib/data/gen/yt-old.json';
import genYtNew from '$lib/data/gen/yt-new.json';
import genYtDtpEthPrague22 from '$lib/data/gen/yt-dtp-ethprague22.json';
import genYtDtpEthPrague23 from '$lib/data/gen/yt-dtp-ethprague23.json';
import peopleSrc from '$lib/data/people.yaml';
import projectsSrc from '$lib/data/projects.yaml';

export const pkg = __PACKAGE__;
export const build = __BUILD__;

export const people = peopleSrc;

export const projects = projectsSrc;

export const events = projectsSrc.map(p => p.events?.map(e => {
    e.project = p.id;
    return e;
})).filter(e => e).flat()

export const archive = [
    genYtDtpEthPrague22,
    genYtDtpEthPrague23,
    genYtNew,
    genYtOld
].flat().sort((x, y) =>
    y.publishedAt > x.publishedAt ? 1 : -1,
);