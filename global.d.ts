declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_URI: string;
      JWT_SECRET: string;
    }
  }
}

export {};
