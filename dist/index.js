import { animate, init } from "./pointers/characterFollower/index.js";
// is this necessary?
/**
 *
 * Returns a cursor object
 *
 * @param {Object} cursorOptions - options for the cursor
 * @param {Array[string]} cursorOptions.pointers - List of all pointers you want to use for the cursor
 * @param {Boolean} cursorOptions.hideCursor - Hides the user default mouse if set to `true`
 * @param {Number} cursorOptions.drag - Number from 0-1 indicating how damped you want the cursor when following the mouse position
 * @param {Number} cursorOptions.xOffset - Number showing the x offset of the cursor
 * @param {Number} cursorOptions.yOffset - Number showing the y offset of the cursor
 *
 * @returns A Cursor type
 */
function Cursor(cursorOptions) {
    const cursorOptionsDefaults = {
        pointers: ['default'],
        hideMouse: true,
        drag: 0,
        xOffset: 0,
        yOffset: 0
    };
    const newCursorOptions = Object.assign({}, cursorOptions);
    // assigns default values to keys not manually defined in the cursor Options
    Object.keys(cursorOptionsDefaults).forEach(property => {
        if (cursorOptions.hasOwnProperty(property))
            newCursorOptions[property] = cursorOptions[property];
        else
            newCursorOptions[property] = cursorOptionsDefaults[property];
    });
    this.hideMouse = newCursorOptions.hideMouse;
    this.getPointers = () => {
        return newCursorOptions.pointers;
    };
    this.getDrag = () => {
        return newCursorOptions.drag;
    };
    this.getXOffset = () => {
        return newCursorOptions.xOffset;
    };
    this.getYOffset = () => {
        return newCursorOptions.yOffset;
    };
    return this;
}
/**
 *
 * @param {Object} pointerOptions - options for the pointer
 * @param {Array[string]} pointerOptions.colors - List of all colors you want to use for the pointer
 * @param {Number} pointerOptions.drag - Number from 0-1 indicating how damped you want the pointer when following the cursor position
 * @param {Number} pointerOptions.size - Number representing size, in pixels, of the pointer
 * @param {Number} pointerOptions.rotation - Number, in degrees, indicating rotation angle of the pointer
 * @param {Number} pointerOptions.xOffset - Number showing the x offset of the pointer
 * @param {Number} pointerOptions.yOffset - Number showing the y offset of the pointer
 */
function Pointer(pointerOptions, objects) {
    const pointerOptionsDefaults = {
        pointerShape: ['string', '💧'],
        colors: ['default'],
        drag: 0,
        size: 50,
        rotation: 0,
        xCharOffset: 0,
        yCharOffset: 0,
        xOffset: 0,
        yOffset: 0
    };
    this.pointerOptions = Object.assign({}, pointerOptions);
    // assigns default values to keys not manually defined in the pointer Options
    Object.keys(pointerOptionsDefaults).forEach(property => {
        if (pointerOptions.hasOwnProperty(property))
            this.pointerOptions[property] = pointerOptions[property];
        else
            this.pointerOptions[property] = pointerOptionsDefaults[property];
    });
    if (this.pointerOptions.pointerShape[0] == 'string') {
        this.startPointer = () => {
            const canvas = document.querySelector('.curses-cursor-canvas');
            const context = canvas.getContext('2d');
            init(canvas, context, objects, this);
        };
    }
    else {
        // TODO: implement a secondary type of pointer here
    }
    return this;
}
function initializeCanvas(cursor, objects) {
    let cursorCanvas = document.querySelector('.curses-cursor-canvas');
    if (!cursorCanvas) {
        cursorCanvas = document.createElement('canvas');
        cursorCanvas.setAttribute('class', 'curses-cursor-canvas');
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
        cursorCanvas.style.cssText = `
        position: fixed;
        pointer-events:none;
        top: 0;
        left: 0;
        `;
        document.querySelector('html').style.cursor = `${(cursor.hideMouse) ? "none" : "auto"}`;
        document.querySelector('a').style.cursor = `${(cursor.hideMouse) ? "none" : "pointer"}`;
        document.querySelector('button').style.cursor = `${(cursor.hideMouse) ? "none" : "auto"}`;
        document.body.appendChild(cursorCanvas);
    }
    const ctx = cursorCanvas.getContext('2d');
    cursor.getPointers().forEach(pointer => {
        pointer.startPointer();
    });
    syncAnimate(objects, cursorCanvas, ctx);
    return cursorCanvas;
}
function syncAnimate(objects, canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => {
        syncAnimate(objects, canvas, context);
    });
    // this is blocking and probably inefficient as it will itterate the list twice
    objects.forEach(objectChar => {
        animate(objectChar, objectChar.pointer);
    });
}
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.js.map