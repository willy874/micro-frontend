import type { Webpack } from '@/types'
import { ForkTsCheckerWebpackPlugin, resolvePlugin } from '@/libs';
import { resolve, currentWorkingDirectory } from '@/utils';

/**
 * @param {Webpack.ParamConfig} param
 * @returns {ForkTsCheckerWebpackPlugin}
 */
export default function getForkTsChecker({ isDev }: Webpack.ParamConfig) {
  return new ForkTsCheckerWebpackPlugin({
    async: isDev,
    typescript: {
      typescriptPath: resolvePlugin.sync('typescript', {
        basedir: resolve('node_modules'),
      }),
      configOverwrite: {
        compilerOptions: {
          sourceMap: isDev,
          skipLibCheck: true,
          inlineSourceMap: false,
          declarationMap: false,
          noEmit: true,
          incremental: true,
          tsBuildInfoFile: resolve(
            'node_modules',
            '.cache',
            'tsconfig.tsbuildinfo'
          ),
        },
      },
      context: currentWorkingDirectory,
      diagnosticOptions: {
        syntactic: true,
      },
      mode: 'write-references',
    },
    issue: {
      include: [
        { file: '../**/src/**/*.{ts,tsx}' },
        { file: '**/src/**/*.{ts,tsx}' },
      ],
      exclude: [
        { file: '**/src/**/__tests__/**' },
        { file: '**/src/**/?(*.){spec|test}.*' },
      ],
    },
    logger: {
      infrastructure: 'silent',
    },
  });
}
