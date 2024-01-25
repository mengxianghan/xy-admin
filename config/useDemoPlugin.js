import fs from 'fs'
import { baseParse } from '@vue/compiler-core'
// eslint-disable-next-line import/no-unresolved
import { marked } from 'marked'

export default () => {
    return {
        name: 'vite-plugin-demo',
        transform: (code, path) => {
            if (!/vue&type=demo/.test(path)) {
                return
            }
            const filePath = path.split('?')[0]
            const file = fs.readFileSync(filePath).toString()
            const parsed = baseParse(file).children.find((n) => n.tag === 'demo')
            const sourceCode = file
                .split(parsed.loc.source)
                .join('')
                .trim()
                .replace(/<!--\s?#(end)?region\s?snippet\s-->\n?/gm, '')
            const [, title, description] = marked
                .parse(parsed.children[0].loc.source)
                .match(/^(?:<h[0-9]>([^<]*)<\/h[0-9]>)([\s\S]*)/)

            return `export default Comp => {
			Comp.code = ${JSON.stringify(sourceCode)}
			Comp.title = ${JSON.stringify(title)}
			Comp.description = ${JSON.stringify(description)}
		}`
        },
    }
}
