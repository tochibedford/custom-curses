import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

let objects = [];

const pointer1 = new Pointer(
  {
    pointerShape: ["string", "⭕"],
    size: 50,
    drag: 0.1,
    yCharOffset: 21,
  },
  objects
);

const pointer2 = new Pointer(
  {
    pointerShape: ["string", "⚫"],
    size: 10,
    drag: 0.9,
    yCharOffset: 6,
  },
  objects
);

const pointer3 = new Pointer(
  {
    pointerShape: ["string", "🔴"],
    size: 10,
    drag: 0.92,
    yCharOffset: 6,
  },
  objects
);

const pointer4 = new Pointer(
  {
    pointerShape: ["string", "⚪"],
    size: 10,
    drag: 0.95,
    yCharOffset: 6,
  },
  objects
);

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2, pointer3, pointer4],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1, objects);
