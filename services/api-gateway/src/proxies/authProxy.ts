import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

export const authProxy = createProxyMiddleware({
  target: `http://localhost:3001`,
  changeOrigin: true,
  logger: console,
});
