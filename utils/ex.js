import { bundle } from './data.js'
import yaml from 'js-yaml'

console.log(yaml.dump(bundle.archive.map(i => ({
    name: i.name,
    desc: i.desc?.substring(0, 700),
})).filter(i => i.desc)))