/** @typedef {Webpack.ConfigurationHandler} ConfigurationHandler */
import { merge } from '@/libs';
import getWebpackWorkingConfig from './webpack';
import { getConfig } from '@/config';
import { getCwdWebpack } from '@/utils';

/**
 * @param {ConfigurationHandler} config
 * @returns {Promise<Webpack.Configuration>}
 */
async function resolveWebpackConfig(config) {
  if (typeof config === 'function') {
    return config(process.env, process.argv);
  } else {
    return config;
  }
}

/**
 *
 * @param {ConfigurationHandler} [config]
 * @returns {Promise<Webpack.Configuration>}
 */
export async function builder(config) {
  const workingConfig = await getWebpackWorkingConfig(getConfig());
  const resolveConfig = await resolveWebpackConfig(config || getCwdWebpack());
  return new Promise((resolve, reject) => {
    try {
      resolve(merge(workingConfig, resolveConfig));
    } catch (error) {
      reject(error);
    }
  });
}

export * from './utils';
