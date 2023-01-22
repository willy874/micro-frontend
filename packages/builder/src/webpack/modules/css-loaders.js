import { getCSSModuleLocalIdent, MiniCssExtractPlugin } from '@/libs';
import { resolve } from '@/utils';

/**
 * @param {'css' | 'icss' | 'module'} type
 * @param {Webpack.ParamConfig} config
 * @param {Webpack.RuleSetRule | Webpack.RuleSetRule[]} [preProcessor]
 * @returns {Webpack.RuleSetRule[]}
 */
const getStyleLoaders = (type, config, preProcessor) => {
  const { isDev } = config;
  /** @type {Webpack.RuleSetRule[]} */
  const loaders = [];
  if (type === 'css') {
    loaders.push({
      loader: 'style-loader',
    });
  }
  loaders.push({
    loader: MiniCssExtractPlugin.loader,
  });
  if (type === 'module') {
    loaders.push({
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        modules: {
          mode: 'local',
          getLocalIdent: getCSSModuleLocalIdent,
        },
      },
    });
  }
  if (type === 'icss') {
    loaders.push({
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        modules: {
          mode: 'icss',
        },
      },
    });
  }
  loaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        config: false,
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
          'postcss-normalize',
        ],
      },
      sourceMap: isDev,
    },
  });
  /**
   * `~ = options.root`
   */
  loaders.push({
    loader: 'resolve-url-loader',
    options: {
      sourceMap: isDev,
      root: resolve('src'),
    },
  });
  if (preProcessor) {
    if (Array.isArray(preProcessor)) {
      loaders.push(...preProcessor);
    } else {
      loaders.push(preProcessor);
    }
  }
  return loaders;
};

/**
 * @param {Webpack.ParamConfig} config
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getCssLoaders(config) {
  return [
    {
      test: /\.(scss|sass|css)$/,
      exclude: /\.module\.(scss|sass|css)$/,
      use: getStyleLoaders('icss', config, {
        loader: 'sass-loader',
      }),
      sideEffects: true,
    },
    {
      test: /\.module\.(scss|sass|css)$/,
      use: getStyleLoaders('module', config, {
        loader: 'sass-loader',
      }),
    },
  ];
}
