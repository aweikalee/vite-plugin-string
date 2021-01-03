import { Plugin } from 'vite'
import { createFilter, dataToEsm, FilterPattern } from '@rollup/pluginutils'

export interface Options {
    include?: FilterPattern
    exclude?: FilterPattern
    compress?: boolean | ((code: string) => string)
}

export default function (userOptions: Options = {}): Plugin {
    const options: Options = Object.assign(
        {
            include: [
                '**/*.vs',
                '**/*.fs',
                '**/*.vert',
                '**/*.frag',
                '**/*.glsl',
            ],
            compress: true,
        } as Options,
        userOptions
    )

    const filter = createFilter(options.include, options.exclude)

    const compress = options.compress === true ? compressGLSL : options.compress

    return {
        name: 'vite-plugin-string',
        transform(source, id) {
            if (!filter(id)) return

            return dataToEsm(compress ? compress(source) : source)
        },
    }
}

function compressGLSL(code: string) {
    let needNewline = false
    return code
        .replace(
            /\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g,
            ''
        )
        .split(/\n+/)
        .reduce((result, line) => {
            line = line.trim().replace(/\s{2,}|\t/, ' ')
            if (line.charAt(0) === '#') {
                if (needNewline) {
                    result.push('\n')
                }
                result.push(line, '\n')
                needNewline = false
            } else {
                result.push(
                    line.replace(
                        /\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|-|!|;)\s*/g,
                        '$1'
                    )
                )
                needNewline = true
            }
            return result
        }, [] as string[])
        .join('')
        .replace(/\n+/g, '\n')
}
