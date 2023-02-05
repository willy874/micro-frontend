import { getConfig } from '../config'

export namespace Webpack {
  export type Configuration = import('webpack').Configuration
  export type ConfigurationHandler = Webpack.Configuration | ((env: NodeJS.ProcessEnv, argv: string[]) => Webpack.Configuration) | ((env: NodeJS.ProcessEnv, argv: string[]) => Promise<Webpack.Configuration>)
  export type Compiler = import('webpack').Compiler
  export type ModuleOptions = import('webpack').ModuleOptions;
  export type RuleSetRule = import('webpack').RuleSetRule;
  export type WebpackPluginInstance = import('webpack').WebpackPluginInstance;
  export type ModuleFederationPlugin = import('webpack').container.ModuleFederationPlugin;
  export type ModuleFederationPluginOptions = ConstructorParameters<typeof import('webpack').container.ModuleFederationPlugin>[0];
  export type DevServerConfiguration = import("webpack-dev-server").Configuration;
  export type ParamConfig = ReturnType<typeof getConfig>
}
