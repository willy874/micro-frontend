/**
 * @returns {Webpack.RuleSetRule[]}
 */
export default function getJsLoaders() {
  return [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'swc-loader',
        },
      ],
    },
  ];
}
