#!/usr/bin/env node
/** @typedef {import('webpack').Configuration} Configuration */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { builder, ConsoleColors } = require('../dist/cjs/main');

async function bootstrap() {
  const webpackConfig = await builder();
  if (webpackConfig.devServer) {
    const compiler = Webpack(webpackConfig);
    const devServerOptions = { ...webpackConfig.devServer };
    const server = new WebpackDevServer(devServerOptions, compiler);
    const runServer = async () => {
      console.log('Starting server...');
      await server.start();
    };
    await runServer();
  } else {
    Webpack(webpackConfig, (error, stats) => {
      if (error) {
        console.log(
          `${ConsoleColors.FgRed}${error.message}${ConsoleColors.Reset}`
        );
      } else {
        console.log(
          `${ConsoleColors.FgGreen}Build success!${ConsoleColors.Reset}`
        );
        console.log(Object.prototype.toString.call(stats));
      }
    });
  }
}

bootstrap();
