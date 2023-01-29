#!/usr/bin/env node
/** @typedef {import('webpack').Configuration} Configuration */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { builder, ConsoleColors } = require('builder');

async function bootstrap() {
  console.log('Starting build...');
  const webpackConfig = await builder();
  if (webpackConfig.devServer) {
    const compiler = Webpack(webpackConfig);
    const devServerOptions = { ...webpackConfig.devServer };
    const server = new WebpackDevServer(devServerOptions, compiler);
    console.log('Starting server...');
    await server.start();
  } else {
    Webpack(webpackConfig, (error) => {
      if (error) {
        console.log(
          `${ConsoleColors.FgRed}${error.message}${ConsoleColors.Reset}`
        );
      } else {
        console.log(
          `${ConsoleColors.FgGreen}Build success!${ConsoleColors.Reset}`
        );
      }
    });
  }
}

bootstrap();
