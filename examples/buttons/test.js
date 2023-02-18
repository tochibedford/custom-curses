import { Cursor, Pointer, initializeCanvas } from "custom-curses";

const pointer1 = new Pointer({
  pointerShape: ["string", "⭕"],
  size: 50,
  drag: 0.1,
  yCharOffset: 21,
});

const cursor1 = new Cursor({
  pointers: [pointer1],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1);

const gridItems = document.querySelectorAll(".grid_item");
gridItems.forEach((item) => {
  item.addEventListener("click", handleClick);
});

function handleClick(e) {
  cleanup();
  pointer1.pointerOptions.pointerShape[1] = e.target.innerText;
  cleanup = initializeCanvas(cursor1);
}
