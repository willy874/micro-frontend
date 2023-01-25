/** @typedef {import('dotenv').DotenvParseOutput} DotenvParseOutput */
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
 * @property {DotenvParseOutput} env
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
  const isServer = Boolean(argv['serve']);
  const mode = env['NODE_ENV'] || 'production';
  const host = getHost();
  const port = getPort();
  return {
    env,
    mode,
    isDev: mode === 'development',
    isProd: mode === 'production',
    isServer,
    app: {
      port,
      host,
      name: env['APP_NAME'],
    },
    remoteModules: {},
  };
}
