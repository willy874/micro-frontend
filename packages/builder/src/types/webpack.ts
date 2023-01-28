import { getConfig } from '../config'

export namespace Webpack {
  export type Configuration = import('@/types/webpack').Configuration
  export type ConfigurationHandler = Webpack.Configuration | ((env: NodeJS.ProcessEnv, argv: string[]) => Webpack.Configuration) | ((env: NodeJS.ProcessEnv, argv: string[]) => Promise<Webpack.Configuration>)
  export type Compiler = import('@/types/webpack').Compiler
  export type ModuleOptions = import('@/types/webpack').ModuleOptions;
  export type RuleSetRule = import('@/types/webpack').RuleSetRule;
  export type WebpackPluginInstance = import('@/types/webpack').WebpackPluginInstance;
  export type ModuleFederationPlugin = import('@/types/webpack').container.ModuleFederationPlugin;
  export type ModuleFederationPluginOptions = ConstructorParameters<typeof import('@/types/webpack').container.ModuleFederationPlugin>[0];
  export type DevServerConfiguration = import("webpack-dev-server").Configuration;
  export type ParamConfig = ReturnType<typeof getConfig>
}
