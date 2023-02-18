import { Cursor, Pointer, initializeCanvas } from "custom-curses";

// this example shows how to use a custom element as a pointer shape
const circle = document.querySelector("#circle");
const circle2 = document.querySelector("#circle2");
const circle3 = document.querySelector("#circle3");

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

const pointer6 = new Pointer({
  pointerShape: ["element", circle2],
  drag: 0.1,
  rotation: 0,
  xOffset: -25,
  yOffset: -25,
});
const pointer7 = new Pointer({
  pointerShape: ["element", circle3],
  drag: 0.1,
  rotation: 0,
  xOffset: 25,
  yOffset: 25,
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
  secondaryPointers: [pointer6, pointer4, pointer5, pointer7],
  transition: 0.5,
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);
