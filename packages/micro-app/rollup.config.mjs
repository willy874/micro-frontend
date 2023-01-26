import path from 'path';
import fs from 'fs';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const plugins = [
  json(),
  commonjs({
    include: /node_modules/,
    ignore: ['bufferutil', 'utf-8-validate'],
    requireReturnsDefault: 'auto',
  }),
  esbuild(),
  typescript(),
  alias({
    entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
  }),
];

/**
 * @type {import('./package.json')}
 */
const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json')).toString()
);

const external = [...Object.keys(packageJson.dependencies || {})];

export default [
  {
    input: 'src/main.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins,
    external,
  },
  {
    input: 'src/main.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    plugins,
    external,
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external,
  },
];
