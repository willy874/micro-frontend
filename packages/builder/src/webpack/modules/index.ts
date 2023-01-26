import type { Webpack } from '@/types'
import getAssetLoaders from './asset-loaders';
import getCssLoaders from './css-loaders';
import getJsLoaders from './js-loaders';

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getModuleLoaders(config: Webpack.ParamConfig) {
  return [
    ...getJsLoaders(),
    {
      oneOf: [...getAssetLoaders(), ...getCssLoaders(config)],
    },
  ];
}
