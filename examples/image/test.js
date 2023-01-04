import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

let objects = [];

const pointer1 = new Pointer(
  {
    pointerShape: ["image", "./assets/mouse_icon.png"],
    size: 50,
    drag: 0.1,
    xCharOffset: 18,
    yCharOffset: 85,
    rotation: -40,
    xOffset: 0,
    yOffset: 0,
  },
  objects
);

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let canvasLol = initializeCanvas(cursor1, objects);
