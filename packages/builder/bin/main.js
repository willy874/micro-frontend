#!/usr/bin/env node
/** @typedef {import('webpack').Configuration} Configuration */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const path = require('path');
const { builder } = require('../dist/cjs/main');

function getCmdWebpack() {
  const webpackPath = path.resolve(process.cwd(), 'webpack.config.js');
  if (fs.existsSync(webpackPath)) {
    return require(webpackPath);
  }
  throw new Error(`Path: ${webpackPath} \nThe webpack.config is not define.`);
}

async function bootstrap() {
  const webpackConfig = await builder(getCmdWebpack());
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
        console.log(error);
      } else {
        console.log('Builder end.');
        console.log(Object.prototype.toString.call(stats));
      }
    });
  }
}

bootstrap();
