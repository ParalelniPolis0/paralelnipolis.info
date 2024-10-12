import slugify from 'slugify'

function calcHash(str) {
    const hash = new Bun.CryptoHasher("sha256");
    hash.update(str);
    return hash.digest('hex');
}

async function meetup_gql2(bodyObj) {
    const body = JSON.stringify(bodyObj)
    const hash = calcHash(body)

    const tmpFile = `./tmp/meetup/${hash}`
    const f = Bun.file(tmpFile);
    if (await f.exists()) {
        return JSON.parse(await f.text());
    }

    const resp = await fetch("https://www.meetup.com/gql2", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "apollographql-client-name": "nextjs-web",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"129\", \"Not=A?Brand\";v=\"8\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-meetup-view-id": "68ee4c71-36df-4065-be79-355c51263730"
        },
        "referrer": "https://www.meetup.com/paralelnipolis/events/?type=past",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const json = await resp.json()

    await Bun.write(tmpFile, JSON.stringify(json, null, 2));
    return json
}

async function loadEvents(urlKey, after) {
    const body = {
        "operationName": "getPastGroupEvents",
        "variables": {
            "urlname": urlKey
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "d2bfd9a0aa0e463c7b016f03666b76ded93f148b3f0445cd6d32c3258eff17d2"
            }
        }
    }
    if (after && after !== true) {
        body.variables.after = after
    }
    const json = await meetup_gql2(body)
    const base = json.data?.groupByUrlname.events
    return {
        items: base.edges.map(e => e.node),
        nextPage: base.pageInfo.hasNextPage ? base.pageInfo.endCursor : false
    }
}

const events = []

let nextPage = true
while (nextPage) {
    const out = await loadEvents("paralelnipolis", nextPage)
    nextPage = out.nextPage
    for (const e of out.items) {
        if (events.length === 0) {
            console.log(e)
        }
        const date = e.dateTime.match(/^(\d{4}-\d{2}-\d{2})/)[1]
        events.push({
            id: `${date}-${slugify(e.title, { lower: true, strict: true })}`,
            name: e.title,
            instance: 'prague',
            date,
            dateTime: e.dateTime,
            endTime: e.endTime,
            description: e.description,
            refs: {
                meetup_id: e.id
            },
        })
    }
}

const outputFn = `./src/data/gen/meetup.json`
await Bun.write(outputFn, JSON.stringify(events, null, 2))
console.log(`\nWrited: ${outputFn} (${events.length} events)`)