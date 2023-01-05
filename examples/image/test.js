import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

let objects = [];
const img1 = new Image();
img1.src = "./assets/mouse_icon.png";
const pointer1 = new Pointer(
  {
    pointerShape: ["image", img1],
    size: 50,
    drag: 0.1,
    xCharOffset: 0,
    yCharOffset: 0,
    rotation: 0,
    xOffset: 0,
    yOffset: 0,
  },
  objects
);

const pointer2 = new Pointer(
  {
    pointerShape: ["string", "🙂"],
    size: 20,
    drag: 0.5,
    xOffset: 50,
    yOffset: 50,
  },
  objects
);

const pointer3 = new Pointer(
  {
    pointerShape: ["string", "😲"],
    size: 20,
    drag: 0.7,
    xOffset: 70,
    yOffset: 70,
  },
  objects
);

const pointer4 = new Pointer(
  {
    pointerShape: ["string", "😶"],
    size: 20,
    drag: 0.8,
    xOffset: 90,
    yOffset: 90,
  },
  objects
);

const pointer5 = new Pointer(
  {
    pointerShape: ["string", "😣"],
    size: 20,
    drag: 0.89,
    xOffset: 110,
    yOffset: 110,
  },
  objects
);

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1, objects);
