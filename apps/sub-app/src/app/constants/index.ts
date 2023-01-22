if (typeof process === 'undefined') {
  new Error('[Error]: The webpack DefinePlugin does not set variable.');
}

if (typeof process.env === 'undefined') {
  new Error('[Error]: The webpack DefinePlugin does not set variable.');
}

export const NODE_ENV = process.env.NODE_ENV;
export const APP_ENV_APP_NAME = process.env.APP_ENV_APP_NAME;
