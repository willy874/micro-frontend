import { getArgv, getEnv } from '@/utils';
import { getHost, getPort } from './env';

/**
 * @typedef {Object} AppConfig
 * @property {string} name
 * @property {number} port
 * @property {string} host
 */

/**
 * @typedef {Object} SubAppConfig
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} WebpackParamConfig
 * @property {import('dotenv').DotenvParseOutput} env
 * @property {"development" | "production"} mode
 * @property {boolean} isDev
 * @property {boolean} isProd
 * @property {boolean} isServer
 * @property {Required<AppConfig>} app
 * @property {{ [k: string]: SubAppConfig }} remoteModules
 */

/**
 * @return {WebpackParamConfig}
 */
export function getConfig() {
  const argv = getArgv();
  const env = getEnv();
  const mode = env['NODE_ENV'] || 'production';
  return {
    env,
    mode,
    isDev: mode === 'development',
    isProd: mode === 'production',
    isServer: Boolean(argv['serve']),
    app: {
      host: getHost(),
      port: getPort(),
      name: env['APP_NAME'],
    },
    remoteModules: {},
  };
}
