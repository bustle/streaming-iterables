import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default {
  input: './dist-ts/index.js',
  plugins: [
    resolve({})
  ],
  output: [
    {
      format: 'umd',
      name: 'streamingIterables',
      file: pkg.main
    },
    {
      format: 'esm',
      file: pkg.module
    }
  ]
}
