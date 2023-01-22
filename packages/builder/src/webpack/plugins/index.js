import { resolve } from '@/utils';
import { HtmlWebpackPlugin, MiniCssExtractPlugin, CopyPlugin } from '@/libs';
import getAssetsPlugin from './assets';
import getDefineEnv from './define-env';
// import getModuleFederation from './module-federation';
import getForkTsChecker from './fork-ts-checker';
import getESLintPlugin from './eslint';

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.Plugin[]}
 */
export default function getPlugins(config) {
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
    new CopyPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.DS_Store', resolve('public', 'index.html')],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    getAssetsPlugin(config),
    getDefineEnv(config),
    // getModuleFederation(config),
    getForkTsChecker(config),
    getESLintPlugin(config),
  ];
}
