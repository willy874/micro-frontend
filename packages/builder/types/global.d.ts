declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | undefined;
      HOST: string | undefined;
      PORT: string | undefined;
      [name: string]: string | undefined;
    }
  }
}

export {}
