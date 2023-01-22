/**
 * @param {Webpack.ParamConfig} param
 * @return {Webpack.DevServerConfiguration}
 */
export default function getDevServe({ app }) {
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
