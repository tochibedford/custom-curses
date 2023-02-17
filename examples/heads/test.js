import { Cursor, Pointer, initializeCanvas } from "custom-curses";

const pointer1 = new Pointer({
  pointerShape: ["string", "👆"],
  size: 50,
  drag: 0.1,
  xCharOffset: 9,
  yCharOffset: 40,
  rotation: -40,
  xOffset: 0,
  yOffset: 0,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "🙂"],
  size: 20,
  drag: 0.5,
  xOffset: 50,
  yOffset: 50,
});

const pointer3 = new Pointer({
  pointerShape: ["string", "😲"],
  size: 20,
  drag: 0.7,
  xOffset: 70,
  yOffset: 70,
});

const pointer4 = new Pointer({
  pointerShape: ["string", "😶"],
  size: 20,
  drag: 0.8,
  xOffset: 90,
  yOffset: 90,
});

const pointer5 = new Pointer({
  pointerShape: ["string", "😣"],
  size: 20,
  drag: 0.89,
  xOffset: 110,
  yOffset: 110,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let canvasLol = initializeCanvas(cursor1);
