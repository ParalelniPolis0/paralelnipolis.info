import { bundle } from './data.js'
import { join, parse } from "path"
import { readdir, mkdir, stat } from "bun";
import crypto from "crypto"
import sharp from "sharp"

const sizes = [
    ["s", 260],
    ["m", 500],
    //["l", 1000],
]

const collections = [
    "people",
    "projects"
]

async function calculateHash(fileBuffer) {
    const hash = crypto.createHash("sha256")
    hash.update(fileBuffer)
    const hexHash = hash.digest("hex")
    return hexHash
}

for (const col of collections) {
    const outputDir = `./static/gimg/${col}`
    const inputDir = `./static/${col}`

    for (const p of bundle[col]) {

        const inputFn = join(inputDir, p.img)

        const input = await Bun.file(inputFn)
        const fileBuffer = await input.arrayBuffer()
        const hash = await calculateHash(fileBuffer)

        const metaFn = join(outputDir, `${p.id}.sha256`)

        let latestHash = null
        const meta = Bun.file(metaFn)
        if (await meta.exists()) {
            latestHash = await meta.text()
        }
        if (latestHash === hash) {
            continue
        }

        const img = sharp(fileBuffer)
        const imgMetadata = await img.metadata();

        for (const [sizeName, size] of sizes) {
            const resizedOutputFn = join(outputDir, sizeName, `${parse(inputFn).name}.webp`)

            const aspectRatio = imgMetadata.width / imgMetadata.height;

            // Determine new dimensions while preserving aspect ratio
            let width, height;
            if (aspectRatio > 1) {
                // Landscape or square
                width = size;
                height = Math.round(size / aspectRatio);
            } else {
                // Portrait
                width = Math.round(size * aspectRatio);
                height = size;
            }

            const resizedImg = await img.clone()
                .resize({
                    width: size,
                    height: size,
                    fit: 'cover',
                    position: 'center',
                    //withoutEnlargement: true,
                })
                .webp({ quality: 80 })
                .toBuffer()

            await Bun.write(resizedOutputFn, resizedImg)
            console.log(`writed: ${resizedOutputFn}`)
        }

        await Bun.write(metaFn, hash)
    }
}