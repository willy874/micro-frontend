import type { Webpack } from '@/types'
import { resolve } from '@/utils';

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getJsLoaders(config: Webpack.ParamConfig): Webpack.RuleSetRule[] {
  const { isDev, isProd } = config
  return [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: resolve('src'),
      loader: require.resolve('babel-loader'),
      options: {
        customize: require.resolve('babel-preset-react-app/webpack-overrides'),
        presets: [
          [
            require.resolve('babel-preset-react-app'),
            {
              runtime: require.resolve('react/jsx-runtime')
                ? 'automatic'
                : 'classic',
            },
          ],
        ],
        cacheDirectory: true,
        cacheCompression: false,
        compact: isProd,
      },
    },
    {
      test: /\.(js|mjs)$/,
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [
          [
            require.resolve('babel-preset-react-app/dependencies'),
            { helpers: true },
          ],
        ],
        cacheDirectory: true,
        cacheCompression: false,
        sourceMaps: isDev,
        inputSourceMap: isDev,
      },
    },
  ];
}
