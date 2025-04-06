import { io } from "socket.io-client";
import { SOCKET_URL } from "./utils/const";
import { Color, rgbBG, rgbToHex } from "./utils/color";
import logger from "./utils/logger";
import { Board, Led, Pin } from "johnny-five";

let kolor: Color | null = null;

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

const board: Board = new Board({
  repl: false,
});

board.on("ready", (): void => {
  logger.info(`Connected to board on ${board.port}`);
  const led = new Led.RGB({
    pins: {
      red: 9,
      green: 10,
      blue: 11,
    },
    isAnode: true,
  });
  socket.on("post", (color: Color): void => {
    kolor = color;
    logger.info(`Received color: ${rgbBG(kolor, rgbToHex(kolor))}`);
    led.color(rgbToHex(kolor));
  });
  board.on("close", (): void => {
    logger.error(`Board closed on ${board.port}`);
  });
});
