import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/dist/index.js',
    format: 'es',
  },
  plugins: [nodeResolve()],
}
