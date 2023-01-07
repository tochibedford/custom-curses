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
    pointerShape: ["string", "👆"],
    size: 50,
    drag: 0.1,
    yCharOffset: 21,
  },
  objects
);

const cursor1 = new Cursor({
  pointers: [pointer1],
  // secondaryPointers: [pointer2],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1, objects);

const gridItems = document.querySelectorAll(".grid_item");
gridItems.forEach((item) => {
  item.addEventListener("click", handleClick);
});

function handleClick(e) {
  cleanup();
  pointer1.pointerOptions.pointerShape[1] = e.target.innerText;
  cleanup = initializeCanvas(cursor1, objects);
}

// window.addEventListener("mouseover", (e) => {
//   if (e.target && e.target.getAttribute("data-cursor") === "secondary") {
//     cleanup();
//     pointer1.pointerOptions.pointerShape[1] = e.target.innerText;
//     cleanup = initializeCanvas(cursor1, objects);
//   }
// });
