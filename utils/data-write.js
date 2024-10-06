import { bundle } from './data.js';
import { join } from "node:path";

const outputDir = "./dist"
const outputBundleFn = join(outputDir, "bundle.json")
await Bun.write(outputBundleFn, JSON.stringify(bundle, null, 2))
console.log(`Writed: ${outputBundleFn}`);