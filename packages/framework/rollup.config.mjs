import path from 'path';
import fs from 'fs';
import module from 'module';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const require = module.createRequire(import.meta.url);

const resolve = (...paths) => path.resolve(process.cwd(), ...paths);

const plugins = [
  json(),
  commonjs({
    include: /node_modules/,
    ignore: ['bufferutil', 'utf-8-validate'],
    requireReturnsDefault: 'auto',
  }),
  esbuild(),
  typescript({
    typescript: require('typescript'),
    tslib: require('tslib'),
  }),
  alias({
    entries: [{ find: '@', replacement: resolve('src') }],
  }),
];

/**
 * @type {import('./package.json')}
 */
const packageJson = JSON.parse(
  fs.readFileSync(resolve('package.json')).toString()
);

const external = [...Object.keys(packageJson.dependencies || {})];

export default [
  {
    input: resolve('src/main.ts'),
    output: {
      file: resolve('dist/esm/main.js'),
      format: 'esm',
    },
    plugins,
    external,
  },
  {
    input: resolve('src/main.ts'),
    output: {
      file: resolve('dist/cjs/main.js'),
      format: 'cjs',
    },
    plugins,
    external,
  },
  {
    input: resolve('src/main.ts'),
    output: {
      file: resolve('dist/types.d.ts'),
      format: 'es',
    },
    plugins: [
      dts({
        tsconfig: resolve('tsconfig.json'),
      }),
    ],
    external,
  },
];
