import type { Webpack } from "./webpack"

export namespace MicroApplication {
  export interface Configuration {
    name?: string;
    publicPath: string;
    configureWebpack?: Webpack.ConfigurationHandler;
    defineEnv?: Record<string, string>;
    moduleFederation?: Webpack.ModuleFederationPluginOptions;
  }
}