import express, { type Express } from "express";
import { createServer, type Server as HTTPServer } from "http";
import { PORT } from "./utils/const";
import { Server, Socket } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger";
import { Color, generateRandomColor, rgbToHex } from "./utils/color";

const app: Express = express();
const server: HTTPServer = createServer(app);

const globalColor: Color = generateRandomColor();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (user: Socket): void => {
  user.on("post", (color: Color): void => {
    logger.info(`user ${user.id} changed color: ${rgbToHex(color)}`);
    globalColor.r = color.r % 255;
    globalColor.g = color.g % 255;
    globalColor.b = color.b % 255;
    if (color.r < 0) globalColor.r = 0;
    if (color.g < 0) globalColor.g = 0;
    if (color.b < 0) globalColor.b = 0;
    user.broadcast.emit("post", color);
  });
  user.on("get", (): void => {
    logger.info(`user ${user.id} requested color`);
    user.emit("post", globalColor);
  });
  logger.info(`++ user connected: ${user.id}`);
  user.on("disconnect", (): void => {
    logger.info(`-- user disconnected: ${user.id}`);
  });
});

server.listen(PORT, (): void => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`http://localhost:${PORT}`);
});
