import type { Webpack } from '@/types'
import { getCSSModuleLocalIdent, MiniCssExtractPlugin } from '@/libs';

type StyleLoadersType = 'css' | 'icss' | 'module'

/**
 * @param {'css' | 'icss' | 'module'} type
 * @param {Webpack.ParamConfig} config
 * @param {Webpack.RuleSetRule | Webpack.RuleSetRule[]} [preProcessor]
 * @returns {Webpack.RuleSetRule[]}
 */
const getStyleLoaders = (type: StyleLoadersType, config: Webpack.ParamConfig, preProcessor: Webpack.RuleSetRule | Webpack.RuleSetRule[]) => {
  const { isDev } = config;
  const loaders: Webpack.RuleSetRule[] = [];
  if (type === 'css') {
    loaders.push({
      loader: require.resolve('style-loader'),
    });
  }
  loaders.push({
    loader: MiniCssExtractPlugin.loader,
  });
  if (type === 'module') {
    loaders.push({
      loader: require.resolve('css-loader'),
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
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: isDev,
        modules: {
          mode: 'icss',
        },
      },
    });
  }
  loaders.push({
    loader: require.resolve('postcss-loader'),
    options: {
      implementation: require.resolve('postcss'),
      postcssOptions: {
        ident: require.resolve('postcss'),
        config: false,
        plugins: [
          require.resolve('postcss-flexbugs-fixes'),
          [
            require.resolve('postcss-preset-env'),
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
          require.resolve('postcss-normalize'),
        ],
      },
      sourceMap: isDev,
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
export default function getCssLoaders(config: Webpack.ParamConfig) {
  return [
    {
      test: /\.(scss|sass|css)$/,
      exclude: /\.module\.(scss|sass|css)$/,
      use: getStyleLoaders('icss', config, {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: require.resolve('sass'),
        },
      }),
      sideEffects: true,
    },
    {
      test: /\.module\.(scss|sass|css)$/,
      use: getStyleLoaders('module', config, {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: require.resolve('sass'),
        },
      })
    },
  ];
}
