# Custom CURSES
## Beautiful Cursors

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

A simple Library to add custom cursors to your Webpage in Javascript.
It utilizes the HTMLCanvasElement .



Preview:
```
import {Cursor, Pointer, initializeCanvas} from './src/index.js'
let objects = []
const pointer1 = new Pointer({pointerShape: ['string', '👆'],size: 100,drag: 0.1, xOffset: 15}, objects)
const pointer2 = new Pointer({pointerShape: ['string', '😲'],size: 20,drag: 0.9, xOffset:100, yOffset: 50}, objects)
const pointer3 = new Pointer({pointerShape: ['string', '༼ つ ◕_◕ ༽つ'], size: 20, drag: 0.97,  Offset:100,y Offset: 50}, objects)
const cursor1 = new Cursor({pointers: [pointer1, pointer2, pointer3],drag: 0, //where 1 is maxhideMouse: true,});
let canvasObject = initializeCanvas(cursor1);
```
![Preview GIF](https://user-images.githubusercontent.com/34871260/186636536-4dff68f9-8b2d-45f2-aeee-0040b52530e1.gif)


## Features

- It accepts Emojis, and any string you can use in the canvas normally but doesn not support the rotation of said characters. I do not know how to implement this ... yet.
- It also supports normal animated canvas objects but I haven't fully implemented it.
- You can adjust the drag on each individual pointer and for the cursor as a whole.
- You can adjust the X and Y offset for each pointer individually and for the cursor as a whole.

## The way it works 
 - A canvas object is instantiated and bound to a Pointer Object (a pointer can ony have 1 canvas object)
 - Several Pointer objects can then be bound to a cursor Object. You can theoretically pass in an infinite number of Pointers to the cursor
 - The cursor object is then drawn to the canvas. For each animation loop It waits for all canvas objects to draw and update before cloearing the canvas.
 - The canvas element is only allowed to have 1 Cursor Object, not sure why anyone would want other wise.

## Installation
This isn't a fully fledged package yet, but for now you can always clone this repo


## Development
Want to contribute? Great! Make an Issue!
