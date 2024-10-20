
import { load } from 'js-yaml';
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const collections = [
    "people",
    "projects",
    "instances",
    "glossary",
]

const srcDir = "./src/data"

async function loadYaml(fn) {
    return load(await Bun.file(fn).text())
}

export const config = await loadYaml(join(srcDir, "config.yaml"))

const archiveGen = {}
const files = await readdir(join(srcDir, "gen"));
for (const fn of files) {
    const tp = fn.split('.')[0]
    archiveGen[tp] = await loadYaml(join(srcDir, "gen", fn))
}
const col = {}
for (const c of collections) {
    col[c] = await loadYaml(join(srcDir, `${c}.yaml`))
}

export const bundle = {
    ...col,
    events: col.projects.map(p => p.events?.map(e => {
        e.project = p.id;
        return e;
    })).filter(e => e).flat(),
    archive: Object.values(archiveGen).flat()
}

/*const outputBundleFn = join(outputDir, "bundle.json")
await Bun.write(outputBundleFn, JSON.stringify(bundle, null, 2))
console.log(`Writed: ${outputBundleFn}`)*/