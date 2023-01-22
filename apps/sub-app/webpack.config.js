const webpack = require('webpack');
const packageFile = require('./package.json');

/** @type {import('webpack').Configuration} */
module.exports = {
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'sub_app',
      filename: 'remoteEntry.js',
      library: {
        type: 'var',
        name: 'sub_app',
      },
      exposes: {
        './app': './src/export.ts',
        './web-components': './src/web-components.ts',
      },
      remotes: ['shared_app'],
      shared: {
        ...packageFile.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageFile.dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageFile.dependencies['react-dom'],
        },
      },
    }),
  ],
};
