import {Cursor, Pointer, initializeCanvas} from './src/index.js'

let objects = []

const pointer1 = new Pointer({
    pointerShape: ['string', '👆'],
    size: 100,
    drag: 0.1, 
    xOffset: 15
}, objects)

const pointer2 = new Pointer({
    pointerShape: ['string', '😲'],
    size: 20,
    drag: 0.9, 
    xOffset:100,
    yOffset: 50
}, objects)

const pointer3 = new Pointer({
    pointerShape: ['string', '༼ つ ◕_◕ ༽つ'],
    size: 20,
    drag: 0.97, 
    xOffset:100,
    yOffset: 50
}, objects)

const cursor1 = new Cursor({
    pointers: [pointer1, pointer2, pointer3],
    drag: 0, //where 1 is max
    hideMouse: true,
});

let canvasLol = initializeCanvas(cursor1);
