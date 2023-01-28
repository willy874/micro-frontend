import { lazy } from 'react';

const ConfigProvider = lazy(async () => ({
  default: (await import('antd')).ConfigProvider,
}));

export { ConfigProvider };
