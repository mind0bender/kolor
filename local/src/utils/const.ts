import { config } from "dotenv";

config();

export const SOCKET_URL: string =
  process.env.SOCKET_URL || "http://localhost:8080";
