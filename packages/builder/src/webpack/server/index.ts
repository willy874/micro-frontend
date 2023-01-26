import type { Webpack } from '@/types'

/**
 * @param {Webpack.ParamConfig} param
 * @return {Webpack.DevServerConfiguration}
 */
export default function getDevServe({ app }: Webpack.ParamConfig): Webpack.DevServerConfiguration {
  return {
    port: String(app.port),
    host: app.host,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {},
  };
}
