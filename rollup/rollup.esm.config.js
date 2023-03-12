import basicConfig from './rollup.config'
import replace from '@rollup/plugin-replace'

const config = {
  ...basicConfig,
  output: [
    {
      name: 'wanyueship',
      file: 'dist/index.es.js',
      format: 'es',
      exports: 'named',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'Axios'
      },
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    ...basicConfig.plugins
  ],
  external: ['react', 'react-dom', 'axios']
}

export default config