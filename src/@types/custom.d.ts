import { Express } from 'express';

declare module 'express' {
  interface Request extends Express.Request {
    cookies: {
      token?: string;
    };
  }
}
