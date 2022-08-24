import {Cursor, Pointer, initializeCanvas} from './src/index.js'

const pointer1 = new Pointer({
    pointerShape: ['string', '💧'],
    size: 100,
    drag: 0.1, 
})

const pointer2 = new Pointer({
    pointerShape: ['string', '👆'],
    size: 100,
    drag: 0.98, 
})

const cursor1 = new Cursor({
    pointers: [pointer1, pointer2],
    drag: 0, //where 1 is max
    hideMouse: false,
    // xOffset: 20,
    // yOffset: 20
});

let canvasLol = initializeCanvas(cursor1);
