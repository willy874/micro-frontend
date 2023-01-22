/** @typedef {Webpack.Configuration | ((env: NodeJS.ProcessEnv, argv: string[]) => Webpack.Configuration) | ((env: NodeJS.ProcessEnv, argv: string[]) => Promise<Webpack.Configuration>)} WebpackConfiguration */
import { merge } from '@/libs';
import getWebpackWorkingConfig from './webpack';

/**
 * @param {WebpackConfiguration} config
 * @returns {Promise<Webpack.Configuration> | Webpack.Configuration}
 */
function resolveWebpackConfig(config) {
  if (typeof config === 'function') {
    return config(process.env, process.argv);
  } else {
    return config;
  }
}

/**
 *
 * @param {WebpackConfiguration} config
 * @returns {Promise<Webpack.Configuration>}
 */
export async function builder(config) {
  const workingConfig = await getWebpackWorkingConfig();
  return new Promise((resolve, reject) => {
    try {
      const cof = resolveWebpackConfig(config);
      if ('then' in cof) {
        cof.then((c) => {
          merge(workingConfig, c);
        });
      } else {
        resolve(merge(workingConfig, cof));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export * from './utils';
