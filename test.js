import {Cursor, initializeCanvas} from './src/index.js'




const cursor1 = new Cursor({
    drag: 1, //where 1 is max
    hideMouse: false,
    // xOffset: 20,
    // yOffset: 20
});
let canvasLol = initializeCanvas(cursor1);

console.log(cursor1.getXOffset())