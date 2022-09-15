import { animate, init } from "./pointers/characterFollower/index.js";
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
        z-index: 10000;
        `;
        if (cursor.hideMouse) {
            document.body.style.cursor = "none";
        }
        const allElements = document.body.querySelectorAll("*");
        allElements.forEach((element) => {
            if (element.tagName !== "SCRIPT" && element.tagName !== "CANVAS" && cursor.hideMouse) {
                element.style.cursor = "none";
            }
        });
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
    objects.forEach(objectChar => {
        animate(objectChar, objectChar.pointer);
    });
}
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.js.map