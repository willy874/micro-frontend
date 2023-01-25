import { getEnv, getArgvString } from '@/utils';

/**
 * @returns {string}
 */
export function getHost() {
  const env = getEnv();
  const host = getArgvString('host', 'h');
  return host || env['HOST'] || '127.0.0.1';
}

/**
 * @returns {number}
 */
export function getPort() {
  const env = getEnv();
  const port = getArgvString('port', 'p');
  const portValue = Number(port || env['PORT']);
  return isFinite(portValue) ? portValue : 8080;
}
