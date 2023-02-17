import { Cursor, Pointer, initializeCanvas } from "custom-curses";

const pointer1 = new Pointer({
  pointerShape: ["string", "⭕"],
  size: 25,
  drag: 0.1,
  yCharOffset: 13,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "⚫"],
  size: 6,
  drag: 0.9,
  yCharOffset: 6,
});

const pointer3 = new Pointer({
  pointerShape: ["string", "👆"],
  size: 25,
  drag: 0.1,
  yCharOffset: 13,
});

const pointer4 = new Pointer({
  pointerShape: ["string", "🔴"],
  size: 12,
  drag: 0.9,
  yCharOffset: 7,
  xOffset: 20,
  yOffset: 20,
});
const pointer5 = new Pointer({
  pointerShape: ["string", "🔴"],
  size: 6,
  drag: 0.95,
  yCharOffset: 7,
  xOffset: 30,
  yOffset: 30,
});
const pointer6 = new Pointer({
  pointerShape: ["string", "🔴"],
  size: 6,
  drag: 0.98,
  yCharOffset: 7,
  xOffset: 40,
  yOffset: 40,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2],
  secondaryPointers: [pointer3, pointer4, pointer5, pointer6],
  transition: 0.4,
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);

// const gridItems = document.querySelectorAll(".grid_item");
// gridItems.forEach((item) => {
//   item.addEventListener("click", handleClick);
// });

// function handleClick(e) {
//   cleanup();
//   pointer1.pointerOptions.pointerShape[1] = e.target.innerText;
//   cleanup = initializeCanvas(cursor1);
// }
