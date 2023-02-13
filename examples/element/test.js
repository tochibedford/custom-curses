import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

// this example shows how to use a custom element as a pointer shape
const circle = document.querySelector("#circle");

const pointer1 = new Pointer({
  pointerShape: ["element", circle],
  drag: 0.1,
  rotation: 0,
  xOffset: -25,
  yOffset: -25,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "🙂"],
  size: 20,
  drag: 0.7,
  xOffset: 30,
  yOffset: 30,
});

const pointer3 = new Pointer({
  pointerShape: ["string", "😲"],
  size: 20,
  drag: 0.9,
  xOffset: 50,
  yOffset: 50,
});

const pointer4 = new Pointer({
  pointerShape: ["string", "😡"],
  size: 20,
  drag: 0.8,
  xOffset: 30,
  yOffset: 30,
});

const pointer5 = new Pointer({
  pointerShape: ["string", "😱"],
  size: 20,
  drag: 0.89,
  xOffset: 50,
  yOffset: 50,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2, pointer3],
  secondaryPointers: [pointer4, pointer5],
  transition: 0.5,
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);
