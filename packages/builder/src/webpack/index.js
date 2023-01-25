import getDevServe from './server';
import getPlugins from './plugins';
import getModuleLoaders from './modules';
import { resolve, getNextEmptyPort } from '@/utils';

/**
 * @param {Webpack.ParamConfig} [config]
 * @returns {Promise<Webpack.Configuration>}
 */
export default async function getWebpackWorkingConfig(config) {
  const { mode, isDev, isServer } = config;

  // 嘗試連接
  if (isServer) {
    const emptyPort = await getNextEmptyPort(config.app.port, config.app.host);
    if (emptyPort !== config.app.port) {
      config.app.port = emptyPort;
    }
  }

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
