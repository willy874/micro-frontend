import type { Webpack } from '@/types'
import { AssetsPlugin } from '@/libs';
import { resolve } from '@/utils';

/**
 * @param {Webpack.ParamConfig} param
 * @returns {AssetsPlugin}
 */
export default function getAssetsPlugin({ isServer }: Webpack.ParamConfig) {
  return new AssetsPlugin({
    filename: 'assets.json',
    path: resolve('dist'),
    removeFullPathAutoPrefix: true,
    keepInMemory: isServer,
    update: true,
    prettyPrint: true,
  });
}
