namespace Configuration {
  interface MicroApplicationConfiguration {
    env?: Record<string, string>;
    webpack?: Webpack.ConfigurationHandler;
  }
}