import { CopyPlugin } from '@/libs';
import { resolve } from '@/utils';

/**
 * @returns {CopyPlugin}
 */
export default function () {
  return new CopyPlugin({
    patterns: [
      {
        from: resolve('public'),
        to: resolve('dist'),
        toType: 'dir',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ['**/.DS_Store', resolve('public', 'index.html')],
        },
        info: {
          minimized: true,
        },
      },
    ],
  });
}
