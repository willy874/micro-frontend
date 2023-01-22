declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | undefined;
      HOST: string | undefined;
      PORT: string | undefined;
    }
  }
}

export { }