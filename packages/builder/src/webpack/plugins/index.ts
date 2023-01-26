import type { Webpack } from '@/types'
import { HtmlWebpackPlugin, MiniCssExtractPlugin } from '@/libs';
import getCopyPlugin from './static-copy';
import getAssetsPlugin from './assets';
import getDefineEnv from './define-env';
import getForkTsChecker from './fork-ts-checker';
import getESLintPlugin from './eslint';

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.WebpackPluginInstance[]}
 */
export default function getPlugins(config: Webpack.ParamConfig) {
  return [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/chunk.[name].[hash].css',
      runtime: false,
    }),
    getCopyPlugin(),
    getAssetsPlugin(config),
    getDefineEnv(config),
    getForkTsChecker(config),
    getESLintPlugin(config),
  ];
}
