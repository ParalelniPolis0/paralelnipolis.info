import { load } from 'js-yaml';
import slugify from 'slugify';

const people = load(await Bun.file('./src/data/people.yaml').text())
const configBase = load(await Bun.file('./src/data/config-base.yaml').text())
const apiKey = process.env.YT_API_KEY;
const missingPersonCounter = {}
const processed = []

const matrix = [
    ['hcpp', 'hcpp16', /^([^-]+) - ([^\|]+) \| HCPP16$/, [2, 1]],
    ['hcpp', 'hcpp17', /^([^-]+) - ([^\|]+) \| HCPP17$/, [2, 1]],
    ['hcpp', 'hcpp18', /(Slévárna|Studio\s?1|Institute): (.+) -\s?([^-]+)/, [2, 3]],
    ['hcpp', 'hcpp19', /^([^-]+) - ([^\|]+) \| #hcpp199?$/, [2, 1]],
    ['hcpp', 'hcpp20', /^HCPP20 - ([^-]+) - ([^\|]+)$/, [2, 1]],
    ['hcpp', 'hcpp21', /^HCPP21 \| (.+) - (.+)$/, [2, 1]],
    ['hcpp', 'hcpp22', /^HCPP22 \| (.+) - (.+)$/, [2, 1]],
    ['hcpp', 'hcpp23', /^HCPP23\s?\| (.+) - (.+)$/, [2, 1]],
    ['pizza-day', 'pd22', /^Pizza Day Prague 2022 \| ([^\|]+) (-|\|) ([^\|]+)$/, [3, 1]],
    ['pizza-day', 'pd23', /^Pizza Day Prague 2023 \| (.+) - ([^\|]+)$/, [2, 1]],
    ['pizza-day', 'pd24', /^Pizza Day Prague 2024 \| (.+) - ([^\|]+)$/, [2, 1]],
    [null, null, /^([^\/]+) \/ ([^\/]+)$/, [1, 2]],
    [null, null, /^([^\|]+) - ([^\|]+)$/, [2, 1]],
]

function processDescription(obj, str) {
    if (obj.event === 'hcpp17') {
        const talkStart = str.indexOf('TALK:');
        const aboutStart = str.indexOf('ABOUT HCPP17');

        if (talkStart !== -1 && aboutStart !== -1) {
            const talkSection = str.substring(talkStart, aboutStart);
            const descriptionStart = 0 //talkSection.indexOf('Cryptocurrencies');

            // Extract the description without the title
            return talkSection.substring(descriptionStart).split('\n').slice(1).join('\n').trim();
        }
    }
    if (obj.event === 'hcpp16') {
        if (str.indexOf('http://bit.ly/playlistHCPP16') !== -1) {
            return str.split('http://bit.ly/playlistHCPP16')[1].trim()
        }
    }
    return str.split('▲▲▲')[0]
}

function decodeHtmlEntities(text) {
    const htmlEntities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'",
        '&#39;': "'",
        // Add more entities as needed
    };

    return text.replace(/&[a-zA-Z0-9#]+;/g, (match) => htmlEntities[match] || match);
}

function toTitleCase(text) {
    // Decode HTML entities
    const decodedText = decodeHtmlEntities(text);

    return decodedText
        .toLowerCase() // Convert the entire string to lowercase
        .split(' ') // Split the string into words
        .map(word => {
            // Capitalize the first letter of each significant word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' '); // Join the words back into a single string
}

function findPeople(title, arr) {
    return arr.map(p => {
        const re = new RegExp(`^${p}$`, 'i');
        const found = people.find(x => x.name.match(re) || x.altNames?.find(an => an.match(re)))
        if (!found) {
            const tslug = p //slugify(p, { lower: true, strict: true })
            if (missingPersonCounter[tslug]) {
                missingPersonCounter[tslug]++
            } else {
                missingPersonCounter[tslug] = 1
            }
            throw new Error(`Person not found: ${p}                        ("${title}")`)
        }
        return found.id
    })
}

async function parseTitle(str, findAll = false, defaultConfig = {}, config = { toTitleCase: true }) {
    for (const [pid, id, re, index] of matrix) {
        if (pid === null && !findAll) {
            continue
        }
        const m = str.match(re)
        if (m) {
            let people;
            try {
                people = findPeople(str, (m[index[1]].includes('&amp;') ? m[index[1]].split('&amp;') : m[index[1]].split(',')).map(a => a.trim()))
            } catch (e) {
                console.error(e.message)
                return null;
            }
            return Object.assign({
                name: config.toTitleCase ? toTitleCase(m[index[0]]) : m[index[0]],
                project: pid,
                event: id,
                people,
            }, defaultConfig)
        }
    }
    return false;
}

async function download(url) {
    const hash = new Bun.CryptoHasher("sha256");
    hash.update(url);
    const digest = hash.digest('hex');
    console.log({ url, digest })

    const tmpFile = `./tmp/yt/${digest}`
    const f = Bun.file(tmpFile);
    if (await f.exists()) {
        return JSON.parse(await f.text());
    }

    const res = await fetch(url);
    const json = await res.json();

    if (json.error) {
        throw new Error(JSON.stringify(json.error, null, 2));
    }

    await Bun.write(tmpFile, JSON.stringify(json, null, 2));
    return json;
}

async function getDetail(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    const out = await download(url)
    return out?.items[0]
}

async function getResults(type = "channel", youtubeId, next) {
    let url;
    if (type === "playlist") {
        url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,id&playlistId=${youtubeId}&maxResults=50&pageToken=${next}&key=${apiKey}`;
    } else if (type === "channel") {
        url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${youtubeId}&maxResults=50&type=video&pageToken=${next}&key=${apiKey}`;
    } else {
        url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,id,contentDetails&id=${youtubeId}&key=${apiKey}`
    }
    return download(url)
}

function parseYouTubeDuration(duration) {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let hours = (match[1] || '0H').slice(0, -1);
    let minutes = (match[2] || '0M').slice(0, -1);
    let seconds = (match[3] || '0S').slice(0, -1);

    return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
}

async function scan(suffix, type, youtubeId, scanAll = false, defaultConfig = {}, config = { toTitleCase: true }) {
    let out = [];
    let next = "";

    while (next !== false) {

        const json = await getResults(type, youtubeId, next)
        if (!json) {
            break
        }
        next = json.nextPageToken || false

        for (const i of json.items) {
            const videoId = i.id?.videoId || i.snippet.resourceId?.videoId || i.id;
            const base = (configBase.archive.find(i => i.videoId === videoId))
            let header = await parseTitle(i.snippet.title, scanAll, defaultConfig, config)
            if (base && header === false) {
                header = base
            } else if (header) {
                Object.assign(header, base)
            }
            if (out.find(i => i.videoId === videoId)) {
                continue
            }

            if (header) {
                if (!header.name) {
                    header.name = i.snippet.title
                }

                const slug = slugify(header.name, { lower: true, strict: true });
                const id = `${header.event ? header.event + '-' : ''}${slug}`;

                // get video details
                const detail = await getDetail(videoId)

                // download thumbnail
                const img = `${header.event}/${id}.jpg`
                const thumbFn = `./static/archive/${img}`;
                if (!await Bun.file(thumbFn).exists()) {
                    const thumb = await fetch((detail.snippet.thumbnails.maxres || detail.snippet.thumbnails.high).url);
                    await Bun.write(thumbFn, thumb)
                }

                // done
                out.push({
                    id,
                    videoId,
                    url: "https://www.youtube.com/watch?v=" + videoId,
                    img,
                    publishedAt: i.snippet.publishedAt || new Date('2015-01-01'),
                    desc: processDescription(header, detail.snippet.description),
                    duration: parseYouTubeDuration(detail.contentDetails.duration),
                    ...header,
                })
                processed.push(videoId)

            } else if (header === false) {
                console.error(`Unknown title: ${i.snippet.title}`)
                //console.log(i.snippet.title)
            }
        }
    }

    // sort by publishedAt for better compare
    out = out.sort((x, y) => x.publishedAt > y.publishedAt ? 1 : -1)

    if (suffix) {
        const outputFn = `./src/data/gen/${suffix}.json`
        await Bun.write(outputFn, JSON.stringify(out, null, 2))

        console.log(`\nWrited: ${outputFn} (${out.length} items)`)
    }
    return out
}

await scan('yt-old', 'channel', 'UCfHJ5Y3akQ7LA0PQmSYlYmQ', true)
await scan('yt-new', 'channel', 'UC_88YKXiY1KDqbS38DVnCqg', true)
await scan('yt-dtp-ethprague22', 'playlist', 'PLkCRcxMT8qhZ7BJXscrgRS3bBUtjrfu8x', true, { project: 'ethprague', event: 'ethprague22' }, { toTitleCase: false })
await scan('yt-dtp-ethprague23', 'playlist', 'PLkCRcxMT8qhbiwMX7S8FvmS9O1jp4xaVs', true, { project: 'ethprague', event: 'ethprague23' }, { toTitleCase: false })

const others = []
for (const v of configBase.archive.filter(i => !processed.includes(i.videoId))) {
    const item = await scan(null, 'video', v.videoId, true)
    others.push(...item)
}

const outputFn = `./src/data/gen/yt-others.json`
await Bun.write(outputFn, JSON.stringify(others, null, 2))
console.log(`\nWrited: ${outputFn} (${others.length} items)`)

console.log('\nstats:')
for (const i of Object.keys(missingPersonCounter).sort()) {
    if (missingPersonCounter[i] < 2) {
        //continue
    }
    console.log(`  ${i}: ${missingPersonCounter[i]}`)
}