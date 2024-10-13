
import { bundle } from './data.js';

for (const e of bundle.events) {
    const missing = []
    const archiveItems = bundle.archive.filter(i => i.event === e.id)
    for (const ai of archiveItems) {
        for (const p of (ai.people || [])) {
            if (!e.speakers?.includes(p)) {
                missing.push(p)
            }
        }
    }
    if (missing.length > 0) {
        console.log(`${e.name} missing:\n- ` + missing.join("\n- ") + '\n')
    }
}