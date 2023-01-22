import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

const plugins = [
  json(),
  resolve({
    preferBuiltins: true,
    mainFields: ['browser'],
  }),
  commonjs(),
  alias({
    entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
  }),
];

const external = [
  'webpack',
  'dotenv',
  'html-webpack-plugin',
  'mini-css-extract-plugin',
  'copy-webpack-plugin',
  'assets-webpack-plugin',
  'eslint-webpack-plugin',
  'resolve',
  'react-dev-utils/ForkTsCheckerWebpackPlugin',
  'react-dev-utils/getCSSModuleLocalIdent',
];

export default [
  {
    input: 'src/main.js',
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins,
    external,
  },
  {
    input: 'src/main.js',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    plugins,
    external,
  },
];
