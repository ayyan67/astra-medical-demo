declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_APP_MODE: 'demo' | 'production';
        NEXT_PUBLIC_APP_URL: string;
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
        DEMO_USER_EMAIL: string;
        DEMO_USER_PASSWORD: string;
      }
    }
  }
  
  export {}