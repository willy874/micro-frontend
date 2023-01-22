/** @typedef {import('dotenv').DotenvParseOutput} DotenvParseOutput */
import fs from 'fs';
import {
  ConsoleColors,
  resolve,
  getArgv,
  getNextEmptyPort,
  getCwdPackage,
} from '@/utils';
import { merge, dotenv } from '@/libs';

/**
 * @typedef {Object} AppConfig
 * @property {string} name
 * @property {string} url
 * @property {number} [port]
 * @property {string} [host]
 */

/**
 * @typedef {Object} WebpackParamConfig
 * @property {DotenvParseOutput} env
 * @property {"development" | "production"} mode
 * @property {boolean} isDev
 * @property {boolean} isProd
 * @property {boolean} isServer
 * @property {any} packageJson
 * @property {Required<AppConfig>} app
 * @property {{ [k: string]: AppConfig }} remoteModules
 */

/**
 * @description
 * * 執行腳本時帶入 `-e <type>` or `-env <type>`，可指定 "`.env.<type>`"
 * * 設定腳本環境變數 `ENV_TYPE＝<type>` 指定 env type
 * * 設定腳本環境變數 `ENV_PATH=<path>` 指定 env 文字檔案
 * @return {string}
 */
function getEnvSrc() {
  const argv = getArgv();
  const envType = process.env['ENV_TYPE'] || argv['e'] || argv['env'];
  const envPath = process.env['ENV_PATH'];
  return envType ? resolve(`.env.${envType}`) : resolve(envPath || '.env');
}

/**
 * @param {string} src
 * @return {Promise<NodeJS.ProcessEnv>}
 */
async function getEnv(src) {
  if (!fs.existsSync(src)) {
    throw new Error(
      `${ConsoleColors.FgRed}The .env path ${ConsoleColors.FgBlue}"${src}"${ConsoleColors.FgRed} is not define.${ConsoleColors.Reset}`
    );
  }
  return merge(process.env, dotenv.parse(await fs.promises.readFile(src)));
}

/**
 * @return {Promise<WebpackParamConfig>}
 */
export async function getConfig() {
  const argv = getArgv();
  const env = await getEnv(getEnvSrc());
  const isServer = Boolean(argv['serve']);
  const defaultHost = env['HOST'] || '127.0.0.1';
  const defaultPort = Number(env['PORT']) || 8080;
  const mode = env['NODE_ENV'] || 'production';
  const port = isServer
    ? await getNextEmptyPort(defaultPort, defaultHost)
    : defaultPort;
  const host = defaultHost === '127.0.0.1' ? 'localhost' : defaultHost;
  return {
    env,
    mode,
    isDev: mode === 'development',
    isProd: mode === 'production',
    isServer,
    packageJson: await getCwdPackage(),
    app: {
      port,
      host,
      name: env['APP_NAME'],
      url: `http://${host}:${port}`,
    },
    remoteModules: {},
  };
}
