import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

// this example shows how to use a custom element as a pointer shape
const circle = document.querySelector("#circle");

const pointer1 = new Pointer({
  pointerShape: ["element", circle],
  size: 50,
  drag: 0.1,
  xCharOffset: 0,
  yCharOffset: 0,
  rotation: 0,
  xOffset: -circle.getBoundingClientRect().width / 4,
  yOffset: -circle.getBoundingClientRect().height / 4,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "🙂"],
  size: 20,
  drag: 0.5,
  xOffset: 30,
  yOffset: 30,
});

const pointer3 = new Pointer({
  pointerShape: ["string", "😲"],
  size: 20,
  drag: 0.7,
  xOffset: 50,
  yOffset: 50,
});

const pointer4 = new Pointer({
  pointerShape: ["string", "😶"],
  size: 20,
  drag: 0.8,
  xOffset: 70,
  yOffset: 70,
});

const pointer5 = new Pointer({
  pointerShape: ["string", "😣"],
  size: 20,
  drag: 0.89,
  xOffset: 90,
  yOffset: 90,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
  secondaryPointers: [pointer2, pointer3],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);
