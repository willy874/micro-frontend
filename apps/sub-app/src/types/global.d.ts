export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [k: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  // interface Window {}

  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    interface ProcessEnv {
      APP_ENV_APP_NAME: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
