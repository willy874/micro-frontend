/** @typedef {import('webpack').Configuration} Configuration */
/** @typedef {Record<string, string | string[] | true | undefined> & { _nodePath: string; _binPath: string; }} ArgvParams */
import path from 'path';
import fs from 'fs';
import http from 'http';
import packageJson from '../../package.json';
import { merge, dotenv } from '@/libs';

const [nodePath, binPath, ...args] = process.argv;

export const __package = packageJson;

export const currentWorkingDirectory = process.cwd();

export const __nodePath = nodePath;

export const __binPath = binPath;

export const __argv = args;

export const ConsoleColors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

/**
 * @param  {...string} args
 * @returns {string}
 */
export function resolve(...args) {
  return path.resolve(currentWorkingDirectory, ...args);
}

let argvCache = null;

/**
 * @param {boolean} [reload]
 * @returns {ArgvParams}
 */
export function getArgv(reload) {
  if (argvCache && !reload) {
    return argvCache;
  }
  const [_nodePath, _binPath, ...args] = process.argv;
  /** @type {ArgvParams} */
  const result = {
    _nodePath,
    _binPath,
  };
  /** @type {string[]} */
  let value = [];
  let k;
  for (let i = 0; i < args.length; i++) {
    const param = args[i];
    const next = args[i + 1];
    const getValue = () => (value.length === 1 ? value[0] : value);
    if (/^--/.test(param)) {
      const ks = param.replace(/^--/, '').split(/-+/g);
      if (ks.length > 1) {
        ks.forEach((s) => (result[s] = true));
      } else {
        const [p] = ks;
        k = p.replace(/^-+/, '');
        value = [];
      }
      continue;
    }
    if (/^-/.test(param)) {
      k = param.replace(/^-+/, '');
      value = [];
    }
    if (/^-/.test(next)) {
      result[k] = value.length ? getValue() : true;
      continue;
    }
    if (i + 1 === args.length) {
      result[k] = value.length ? getValue() : true;
      break;
    }
    if (next) {
      value.push(next);
    }
  }
  argvCache = result;
  return result;
}

/**
 * @param {string[]} params
 * @returns {string}
 */
export function getArgvString(...params) {
  const argv = getArgv();
  const value = argv[params.find((p) => argv[p])];
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    const [v] = value;
    return v;
  }
  return '';
}

/**
 * @param {string[]} params
 * @returns {string | null}
 */
export function getArgvPath(...params) {
  const argv = getArgv();
  let argvPath = argv[params.find((p) => argv[p])];
  let resolvePath = '';
  if (typeof argvPath === 'string') {
    resolvePath = resolve(argvPath);
  }
  if (typeof argvPath === 'boolean') {
    return null;
  }
  if (Array.isArray(argvPath)) {
    const [value] = argvPath;
    resolvePath = resolve(value);
  }
  if (fs.existsSync(resolvePath)) {
    return resolvePath;
  }
  return null;
}

/**
 * @param {string[]} params
 * @returns {string | null}
 */
export function getEnvPath(...params) {
  const envPath = process.env[params.find((p) => process.env[p])];
  const resolvePath = resolve(envPath);
  if (fs.existsSync(resolvePath)) {
    return resolvePath;
  }
  return null;
}

/**
 * @param {string[]} params
 * @returns {string | null}
 */
export function getFilePath(...params) {
  const filePath = params.find((p) => fs.existsSync(resolve(p)));
  if (filePath) {
    return resolve(filePath);
  }
  return null;
}

/**
 * @typedef {Object} PathOptions
 * @property {string} src
 * @property {string[]} env
 * @property {string[]} argv
 * @property {string[]} file
 */

/**
 * @param {PathOptions} options
 */
export function getPathSrc(options) {
  let source = options.src;
  if (fs.existsSync(resolve(source))) {
    return resolve(source);
  }
  source = getArgvPath(...options.argv);
  if (source) return source;
  source = getEnvPath(...options.env);
  if (source) return source;
  source = getFilePath(...options.file);
  if (source) return source;
  return null;
}

/**
 * @param {string} src
 * @return {object}
 */
export function readFileSync(src) {
  if (fs.existsSync(src)) {
    throw new Error(
      `${ConsoleColors.FgRed}The path ${ConsoleColors.FgBlue}${src}${ConsoleColors.Reset} is not define!${ConsoleColors.Reset}`
    );
  }
  if (/\.(c|m)?js$/.test(src)) {
    return require(src);
  }
  if (/\.json$/.test(src)) {
    const json = fs.readFileSync(src);
    return JSON.parse(json.toString());
  }
  if (/^\.(\w)+rc$/.test(src)) {
    const json = fs.readFileSync(src);
    return JSON.parse(json.toString());
  }
  return fs.readFileSync(src);
}

let envCache = null;

/**
 * @param {string} [src]
 * @param {boolean} [reload]
 * @return {NodeJS.ProcessEnv}
 * @description
 * * 執行腳本時帶入 `-e <path>` or `-env <path>`，可指定 env 路徑"
 * * 設定腳本環境變數 `ENV_PATH=<path>` 指定 env 文字檔案
 */
export function getEnv(src, reload) {
  if (envCache && !reload) {
    return envCache;
  }
  const source = getPathSrc({
    src,
    env: ['ENV_PATH'],
    argv: ['env', 'e'],
    file: ['.env'],
  });
  envCache = merge(process.env, dotenv.parse(readFileSync(source)));
  return envCache;
}

/**
 * @param {string} [src]
 * @return {Configuration.MicroApplicationConfiguration}
 * @description
 * * 執行腳本時帶入 `-config <path>` or `-c <path>`，可指定 config 路徑"
 * * 設定腳本環境變數 `APP_CONFIG_PATH=<path>` 指定 config 檔案
 */
export function getAppConfigSrc(src) {
  const source = getPathSrc({
    src,
    env: ['APP_CONFIG_PATH'],
    argv: ['config', 'c'],
    file: [
      '.microapprc',
      'microapp.config.js',
      'microapp.config.mjs',
      'microapp.config.json',
    ],
  });
  return readFileSync(source);
}

/**
 * @return {{ dependencies: Record<string, string>; [k: string]: any; }}
 */
export function getCwdPackage() {
  const packagePath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    return readFileSync(packagePath);
  }
  throw new Error(`Path: ${packagePath} \nThe package.json is not define.`);
}

/**
 * @return {Configuration | ((env: any, argv: any) => Configuration)}
 */
export function getCwdWebpack() {
  const webpackPath = path.resolve(process.cwd(), 'webpack.config.js');
  if (fs.existsSync(webpackPath)) {
    return readFileSync(webpackPath);
  }
  throw new Error(`Path: ${webpackPath} \nThe webpack.config is not define.`);
}

/**
 * @param {number} port
 * @param {string} host
 * @returns {Promise<number>}
 */
export function getNextEmptyPort(port, host = '127.0.0.1') {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.listen(port, host, (err) => {
      if (err instanceof Error) {
        if ('code' in err && err.code === 'EADDRINUSE') {
          resolve(getNextEmptyPort(++port, host));
        } else {
          reject(err);
        }
      } else {
        server.close();
        resolve(port);
      }
    });
  });
}
