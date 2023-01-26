import type { Webpack } from '@/types'
import { DefinePlugin } from 'webpack';

/**
 * @param {Webpack.ParamConfig} param
 * @returns {DefinePlugin}
 * @descriptions
 * - 可以解析字串曝露到瀏覽器環境
 * - 使用 `APP_ENV_` 前綴可直接在 `.env` 進行解析
 */
export default function getDefineEnv({ mode, env }: Webpack.ParamConfig) {
  const exposeEnv = {
    NODE_ENV: mode,
  };
  Object.keys(env).forEach((key) => {
    if (/^APP_ENV_/.test(key)) {
      exposeEnv[key] = env[key];
    }
  });
  return new DefinePlugin({
    'process.env': JSON.stringify(exposeEnv),
  });
}
