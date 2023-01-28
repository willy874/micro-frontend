import fs from 'fs';
import path from 'path';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const plugins = [
  image(),
  commonjs({
    include: /node_modules/,
    ignore: ['bufferutil', 'utf-8-validate'],
    requireReturnsDefault: 'auto',
  }),
  json(),
  alias({
    entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
  }),
  typescript(),
  esbuild(),
];

/**
 * @type {import('./package.json')}
 */
const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json')).toString()
);

const external = [...Object.keys(packageJson.dependencies || {})];

const exportModules = [
  {
    input: 'src/export.ts',
    output: {
      file: 'dist/main.esm.js',
      format: 'esm',
    },
    plugins,
    external,
  },
  {
    input: 'src/export.ts',
    output: {
      file: 'dist/main.cjs.js',
      format: 'cjs',
    },
    plugins,
    external,
  },
  {
    input: 'src/export.ts',
    output: {
      file: 'dist/types-main.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default exportModules;
