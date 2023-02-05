/** @typedef {import('webpack').Configuration} Configuration */
/** @typedef {Record<string, string | string[] | true | undefined> & { _nodePath: string; _binPath: string; }} ArgvParams */
import path from 'path';
import fs from 'fs';
import http from 'http';
import packageJson from '../../package.json';

const [nodePath, binPath, ...args] = process.argv;

export const __package = packageJson;

export const currentWorkingDirectory = process.cwd();

export const __nodePath = nodePath;

export const __binPath = binPath;

export const __argv = args;

/**
 * @param  {...string} args
 * @returns {string}
 */
export function resolve(...args) {
  return path.resolve(currentWorkingDirectory, ...args);
}

/**
 * @returns {ArgvParams}
 */
export function getArgv() {
  const [_nodePath, _binPath, ...args] = process.argv;
  let i = -1;
  /** @type {ArgvParams} */
  const result = {
    _nodePath,
    _binPath,
  };
  /** @type {string[]} */
  let value = [];
  let k;
  while (i + 1 < args.length) {
    i++;
    const param = args[i];
    const v = args[i + 1];
    const getValue = () => (value.length === 1 ? value[0] : value);
    if (/^--/.test(param)) {
      param
        .replace(/^--/, '')
        .split(/-+/g)
        .forEach((s) => (result[s] = true));
      continue;
    }
    if (/^-/.test(param)) {
      k = param.replace(/^-+/, '');
      value = [];
    }
    if (/^-/.test(v)) {
      result[k] = value.length ? getValue() : true;
      continue;
    }
    if (i + 1 === args.length) {
      result[k] = value.length ? getValue() : true;
      break;
    }
    if (v) value.push(v);
  }
  return result;
}

/**
 * @return {Promise<any>}
 */
export async function getCwdPackage() {
  const packagePath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = await fs.promises.readFile(packagePath);
    return JSON.parse(packageJson.toString());
  }
  throw new Error(`Path: ${packagePath} \nThe package.json is not define.`);
}

/**
 * @return {Promise<Configuration | ((env: any, argv: any) => Configuration)>}
 */
export async function getCwdWebpack() {
  const webpackPath = path.resolve(process.cwd(), 'webpack.config.js');
  if (fs.existsSync(webpackPath)) {
    return require(webpackPath);
  }
  throw new Error(`Path: ${webpackPath} \nThe webpack.config is not define.`);
}

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
 * @param {number} port
 * @param {string} host
 * @returns {Promise<number>}
 */
export function getNextEmptyPort(port, host) {
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

export function getCmdWebpack() {
  const webpackPath = path.resolve(process.cwd(), 'webpack.config.js');
  if (fs.existsSync(webpackPath)) {
    return require(webpackPath);
  }
  throw new Error(`Path: ${webpackPath} \nThe webpack.config is not define.`);
}
