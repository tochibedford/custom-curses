import { Cursor, Pointer, initializeCanvas } from "../../dist/index.js";

// or

// import { Cursor, Pointer, initializeCanvas } from "custom-curses"; // if using a bundler
const objects = [];

const pointerOptions = {
  pointerShape: ["string", "💧"],
  colors: ["default"],
  drag: 0.98,
  size: 50,
  rotation: 0,
  xCharOffset: 0,
  yCharOffset: 0,
  xOffset: 0,
  yOffset: 45,
};

const pointer1 = new Pointer(pointerOptions, objects);

const cursorOptions = {
  pointers: [pointer1],
  hideMouse: true,
  drag: 0,
  xOffset: 0,
  yOffset: 0,
};

const cursor = new Cursor(cursorOptions, objects);

let cleanup = initializeCanvas(cursor, objects);

const myListOfEmojis = ["😥", "😎", "🦄", "🐱‍🏍"];
let currIndex = 0;

const intervalId = setInterval(() => {
  if (currIndex >= myListOfEmojis.length) {
    currIndex = 0;
  }
  cleanup();
  pointerOptions.pointerShape[1] = myListOfEmojis[currIndex];
  cleanup = initializeCanvas(cursor, objects);
  currIndex++;
}, 3000);
