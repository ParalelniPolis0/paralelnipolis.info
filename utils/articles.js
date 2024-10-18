import GhostContentAPI from '@tryghost/content-api';
import { bundle } from './data.js';

export const ghostClient = new GhostContentAPI({
    url: 'https://ghost.pp0.co',
    key: process.env.GHOST_CONTENT_KEY,
    version: 'v5.0',
});

const posts = await ghostClient.posts.browse({ limit: "all", include: 'tags,authors' })

const items = posts.map(p => {
    console.log(p)
    return {
        id: p.id,
        slugId: p.id.slice(0, 6) + '-' + p.slug,
        title: p.title,
        slug: p.slug,
        html: p.html,
        img: p.feature_image,
        //createdAt: p.created_at,
        publishedAt: p.published_at,
        updatedAt: p.updated_at,
        excerpt: p.excerpt,
        authors: ['instances:zero'], /*p.authors.map(a => {
            if (!bundle.people.find(p => p.id === a.slug)) {
                return null
            }
            return a.slug
        }).filter(a => a)*/
    }
})

const outputFn = `./src/data/gen/articles.json`
await Bun.write(outputFn, JSON.stringify(items, null, 2))
console.log(`\nWrited: ${outputFn} (${items.length} items)`)