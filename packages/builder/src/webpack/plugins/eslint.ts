import type { Webpack } from '@/types'
import url from 'url';
import { ESLintPlugin } from '@/libs';
import { resolve, currentWorkingDirectory } from '@/utils';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * @param {Webpack.ParamConfig} param
 * @returns {ESLintPlugin}
 */
export default function getESLintPlugin({ isDev }: Webpack.ParamConfig) {
  return new ESLintPlugin({
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    formatter: require.resolve('react-dev-utils/eslintFormatter'),
    eslintPath: require.resolve('eslint'),
    failOnError: isDev,
    context: resolve('src'),
    cache: true,
    cacheLocation: resolve('node_modules', '.cache', '.eslintcache'),
    cwd: currentWorkingDirectory,
    resolvePluginsRelativeTo: __dirname,
    baseConfig: {
      extends: [require.resolve('@micro-app/configuration/eslint.react')],
    },
  });
}
