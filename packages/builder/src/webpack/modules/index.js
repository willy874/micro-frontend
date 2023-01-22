import getAssetLoaders from './asset-loaders';
import getCssLoaders from './css-loaders';
import getJsLoaders from './js-loaders';

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getModuleLoaders(config) {
  return [
    ...getJsLoaders(),
    {
      oneOf: [...getAssetLoaders(), ...getCssLoaders(config)],
    },
  ];
}
