# Vite Plugin String
Converts text files to modules. Such as .vs, .fs, .vert, .frag, .glsl, wgsl etc.

```js
import fragment from './fragment.glsl'
console.log(fragment)
```

## Installation
```sh
npm install --save-dev vite-plugin-string
```

> If you are using `vite@1.0.0`, please install `vite-plugin-string@0.0.2`.

## Usage
``` js
// vite.config.js
import vitePluginString from 'vite-plugin-string'

export default {
  plugins: [
    vitePluginString()
  ]
}
```

## Options
```js
vitePluginString(options)
```
```js
{
  /* Default */
  include: [
    '**/*.vs',
    '**/*.fs',
    '**/*.vert',
    '**/*.frag',
    '**/*.glsl',
    '**/*.wgsl',
  ],

  /* Default: undefined */
  exclude: 'node_modules/**',

  /* Default: true */
  // if true, using logic from rollup-plugin-glsl
  compress: true,

  // if a function, will instead of default compress function
  // returns string|Promise<string>
  compress(code) {
    return code.replace(/\n/g, '')
  }
}
```