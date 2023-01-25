declare namespace Webpack {
  type Configuration = import('webpack').Configuration
  type ConfigurationHandler = Webpack.Configuration | ((env: NodeJS.ProcessEnv, argv: string[]) => Webpack.Configuration) | ((env: NodeJS.ProcessEnv, argv: string[]) => Promise<Webpack.Configuration>)
  type Compiler = import('webpack').Compiler
  type ModuleOptions = import('webpack').ModuleOptions;
  type RuleSetRule = import('webpack').RuleSetRule;
  type DevServerConfiguration = import("webpack-dev-server").Configuration;
  type ParamConfig = import('../src/config').WebpackParamConfig;
  interface Plugin { apply: (compiler: Compiler) => void; }
}
