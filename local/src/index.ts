import { io } from "socket.io-client";
import { SOCKET_URL } from "./utils/const";
import { Color, rgbToHex } from "./utils/color";
import logger from "./utils/logger";

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

logger.info("Connecting to server...");

socket.on("connect", (): void => {
  logger.info("Connected to server");
});
socket.on("disconnect", (): void => {
  logger.error("Disconnected from server");
});

socket.on("post", (color: Color): void => {
  logger.info(`Received message: ${rgbToHex(color)}`);
});
