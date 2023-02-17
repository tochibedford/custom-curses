import { Cursor, Pointer, initializeCanvas } from "custom-curses";

const pointer1 = new Pointer({
  pointerShape: ["string", "👆"],
  size: 50,
  drag: 0.1,
  xCharOffset: 18,
  yCharOffset: 85,
  rotation: -40,
  xOffset: 0,
  yOffset: 0,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "༼ つ ◕_◕ ༽つ"],
  size: 20,
  drag: 0.97,
  xOffset: 200,
  yOffset: 100,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);
