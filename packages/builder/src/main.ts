import { Webpack } from './types';
import { merge } from './libs';
import getWebpackWorkingConfig from './webpack';
import { getConfig } from './config';
import { getCwdWebpack } from './utils';

/**
 * @param {Webpack.ConfigurationHandler} config
 * @returns {Promise<Webpack.Configuration>}
 */
async function resolveWebpackConfig(config: Webpack.ConfigurationHandler) {
  if (typeof config === 'function') {
    return config(process.env, process.argv);
  } else {
    return config;
  }
}

/**
 * @param {Webpack.ConfigurationHandler} [config]
 * @returns {Promise<Webpack.Configuration>}
 */
export async function builder(config: Webpack.ConfigurationHandler): Promise<Webpack.Configuration> {
  const workingConfig = await getWebpackWorkingConfig(getConfig());
  const resolveConfig = await resolveWebpackConfig(config || getCwdWebpack());
  return new Promise((resolve, reject) => {
    try {
      resolve(merge<Webpack.Configuration>(workingConfig, resolveConfig));
    } catch (error) {
      reject(error);
    }
  });
}

export * from './utils';
export * from './types'
