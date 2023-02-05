/**
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getAssetLoaders() {
  return [
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10000,
        },
      },
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            prettier: false,
            svgo: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
            titleProp: true,
            ref: true,
          },
        },
        {
          loader: require.resolve('file-loader'),
          options: {
            name: 'images/[ext]/[name].[hash].[ext]',
          },
        },
      ],
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    },
  ];
}
