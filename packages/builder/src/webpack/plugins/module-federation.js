import { container } from 'webpack';
import { getCwdPackage } from '@/utils';

/**
 * @param {Webpack.ParamConfig} param
 * @returns {import('webpack').container.ModuleFederationPlugin}
 */
export default function getModuleFederation({ app }) {
  const packageJson = getCwdPackage();
  return new container.ModuleFederationPlugin({
    name: app.name,
    filename: 'remoteEntry.js',
    library: {
      type: 'var',
      name: app.name,
    },
    exposes: {
      './app': './src/export.ts',
      './web-components': './src/web-components.ts',
    },
    // remotes: [],
    shared: {
      ...packageJson.dependencies,
      react: {
        singleton: true,
        requiredVersion: packageJson.dependencies['react'],
      },
      'react-dom': {
        singleton: true,
        requiredVersion: packageJson.dependencies['react-dom'],
      },
    },
  });
}
