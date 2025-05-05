import express from "express";
import dotenv from "dotenv";
//import { authProxy } from "./proxies/authProxy";
import { authenticateJWT } from "./middlewares/authMiddleware";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const app = express();

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: `http://localhost:3001`,
    changeOrigin: true,
    logger: console,
  })
);

app.use(
  "/api/user",
  authenticateJWT,
  createProxyMiddleware({
    target: `http://localhost:3002`,
    changeOrigin: true,
    logger: console,
  })
);

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
