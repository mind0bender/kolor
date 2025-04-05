import { config } from "dotenv";

config();

export const PORT: string = process.env.PORT || "8080";
