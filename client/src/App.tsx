import { ChangeEvent, JSX, useEffect, useState } from "react";
import socket from "./utils/socket";
import { Color, contrastColor, hexToRgb, rgbToHex } from "./utils/color";

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
      className={`min-h-screen w-full flex flex-col gap-4 items-center justify-center duration-100`}>
      <h1
        className={`text-6xl font-semibold font-mono duration-200`}
        style={{
          color: contrastColor(color ? color : { r: 0, g: 0, b: 0 }),
        }}>
        Kolor
      </h1>
      {color ? (
        <label className={`cursor-pointer`} htmlFor={"kolor"}>
          <div
            className={`px-4 py-3 cursor-pointer bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
            <input
              id={"kolor"}
              name={"kolor"}
              value={rgbToHex(color)}
              type="color"
              className={`scale-0 absolute`}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                setColor(hexToRgb(e.target.value));
                socket.emit("post", hexToRgb(e.target.value));
              }}
            />
            <div
              className={`flex flex-col items-center justify-center font-mono`}>
              <h2 className={`text-4xl`}>{rgbToHex(color)}</h2>
              <h3 className={`text-2xl`}>
                rgb({String(color.r).padStart(3, "0")},{" "}
                {String(color.g).padStart(3, "0")},{" "}
                {String(color.b).padStart(3, "0")})
              </h3>
            </div>
          </div>
        </label>
      ) : (
        <div>Fetching Kolor</div>
      )}
    </div>
  );
}

export default App;
