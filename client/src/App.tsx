import { ChangeEvent, JSX, useEffect, useState } from "react";
import socket from "./utils/socket";
import { Color, hexToRgb, rgbToHex } from "./utils/color";

function App(): JSX.Element {
  const [color, setColor] = useState<Color | null>(null);

  useEffect((): (() => void) => {
    console.log("lol");
    socket.on("connect", (): void => {
      console.log("Connected to server");
    });
    socket.emit("get");
    socket.on("post", (color: Color): void => {
      setColor(color);
      console.log("Received color:", color);
    });
    socket.on("disconnect", (): void => {
      console.log("Disconnected from server");
    });
    return (): void => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("post");
      socket.off("get");
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: color ? rgbToHex(color) : "#1e1e1e",
      }}
      className={`min-h-screen w-full`}>
      {color ? (
        <input
          value={rgbToHex(color)}
          type="color"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setColor(hexToRgb(e.target.value));
            socket.emit("post", hexToRgb(e.target.value));
          }}
        />
      ) : (
        <div>Fetching Kolor</div>
      )}
    </div>
  );
}

export default App;
