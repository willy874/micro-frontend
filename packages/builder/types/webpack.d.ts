declare namespace Webpack {
  type Configuration = import('webpack').Configuration
  type Compiler = import('webpack').Compiler
  type ModuleOptions = import('webpack').ModuleOptions;
  type RuleSetRule = import('webpack').RuleSetRule;
  type DevServerConfiguration = import("webpack-dev-server").Configuration;
  type ParamConfig = import('../src/config').WebpackParamConfig;
  interface Plugin { apply: (compiler: Compiler) => void; }
}
