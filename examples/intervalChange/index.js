import { Cursor, Pointer, initializeCanvas } from "custom-curses";

// or

// import { Cursor, Pointer, initializeCanvas } from "custom-curses"; // if using a bundle

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

const pointer1 = new Pointer(pointerOptions);

const cursorOptions = {
  pointers: [pointer1],
  hideMouse: true,
  drag: 0,
  xOffset: 0,
  yOffset: 0,
};

const cursor = new Cursor(cursorOptions);

let cleanup = initializeCanvas(cursor);

const myListOfEmojis = ["😥", "😎", "🦄", "🐱‍🏍"];
let currIndex = 0;

const intervalId = setInterval(() => {
  if (currIndex >= myListOfEmojis.length) {
    currIndex = 0;
  }
  cleanup();
  pointerOptions.pointerShape[1] = myListOfEmojis[currIndex];
  cleanup = initializeCanvas(cursor);
  currIndex++;
}, 3000);
