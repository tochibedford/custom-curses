# Custom CURSES

## Beautiful Cursors

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

A simple Library to add custom cursors to your Webpage in Javascript.
It utilizes the HTMLCanvasElement .

Examples: [https://custom-curses.vercel.app/](https://custom-curses.vercel.app/)

Preview:

```javascript
import { Cursor, Pointer, initializeCanvas } from "custom-curses";
const pointer1 = new Pointer({
  pointerShape: ["string", "👆"],
  size: 50,
  drag: 0.1,
  xCharOffset: 18,
  yCharOffset: 85,
  rotation: -40,
  xOffset: 0,
  yOffset: 0,
});

const pointer2 = new Pointer({
  pointerShape: ["string", "༼ つ ◕_◕ ༽つ"],
  size: 20,
  drag: 0.97,
  xOffset: 200,
  yOffset: 100,
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2],
  drag: 0, //where 1 is max
  hideMouse: true,
});

let cleanup = initializeCanvas(cursor1); // this function returns a cleanup function that can be used to dispose all the cursors/pointers cleanly
```

![Preview GIF](https://user-images.githubusercontent.com/34871260/186636536-4dff68f9-8b2d-45f2-aeee-0040b52530e1.gif)

## React

You only need to wrap the `initializeCanvas` function in a `useEffect` hook

More example usages in `./examples/` or [https://custom-curses.vercel.app/](https://custom-curses.vercel.app/)

## Features

- It accepts Emojis, and any string you can use in the canvas normally and the rotation of said characters.
- It now accepts any images that can be used with the HTMLCanvas directly, but animated GIF images will only render the first frame of the GIF.
- You can adjust the drag on each individual pointer and for the cursor as a whole.
- You can adjust the X and Y offset for each pointer individually and for the cursor as a whole.

- The library now works with React (just wrap it in a useEffect)
- The library now works with Next (just wrap it in a useEffect, and also wrap import the page using dynamic imports, see: [Issue #10](https://github.com/tochibedford/custom-curses/issues/10))

## The way it works

- Several Pointer objects can be bound to a cursor Object. You can theoretically pass in an infinite number of Pointers to the cursor.
- The cursor object is then drawn to the canvas. For each animation loop it waits for all canvas objects to draw and update before clearing the canvas.
- A canvas object is instantiated and bound to the Cursor Object.
- The canvas element is only allowed to have 1 Cursor Object, not sure why anyone would want other wise.

## Installation

Using npm:
`npm install custom-curses`

Provision will be made for a cdn link

## Development

Want to contribute? Great! Make an Issue!
