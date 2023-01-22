import getDevServe from './server';
import getPlugins from './plugins';
import getModuleLoaders from './modules';
import { resolve } from '@/utils';
import { getConfig } from '@/config';

/**
 * @returns {Promise<Webpack.Configuration>}
 */
export default async function getWebpackWorkingConfig() {
  const config = await getConfig();
  const { mode, isDev, isServer } = config;

  return {
    entry: {
      app: resolve('src', 'main.ts'),
    },
    mode,
    devtool: isDev ? 'cheap-module-source-map' : false,
    output: {
      clean: false,
      publicPath: 'auto',
      hashFunction: 'xxhash64',
      path: resolve('dist'),
      filename: 'js/entry.[name].[hash].js',
      chunkFilename: 'js/chunk.[name].[hash].js',
      assetModuleFilename: 'images/[hash][ext]',
    },
    devServer: isServer ? getDevServe(config) : undefined,
    module: {
      rules: getModuleLoaders(config),
    },
    plugins: getPlugins(config),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': resolve('src'),
      },
    },
    performance: {
      hints: false,
    },
    target: 'web',
  };
}
