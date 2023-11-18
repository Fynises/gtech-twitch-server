declare namespace NodeJS {
  export interface ProcessEnv {
    LISTEN_PORT: number;
    TWITCH_CLIENT_ID: string;
    JWT_SECRET: string;
    TWITCH_CLIENT_SECRET: string;
    TWITCH_REDIRECT_URI: string;
    TWITCH_EVENT_SUB_URL: string;
    JWT_SECRET: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
