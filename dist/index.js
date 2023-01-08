import { animate, init } from "./pointers/characterFollower/index.js";
import { isDeviceMobileOrTablet } from "./detectMobileTablet.js";
const objects = [];
/**
 * Class representing a Cursor object.
 * @remarks You can have only one Cursor object in a project.
 * The Cursor object houses the various pointer objects you have created, and each of the pointers follow the cursor as a kind of parent
 *
 * @example
 * const cursor1 = new Cursor({
    pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
    drag: 0, //where 1 is max
    hideMouse: true,
});
 *
 */
class Cursor {
    /**
     * A boolean value that determines whether the System cursor is hidden or not
     */
    hideMouse;
    /**
     * An array of all pointers being used by the cursor
     */
    pointers;
    /**
     * An array of all secondary pointers being used by the cursor
     */
    secondaryPointers;
    /**
     * A functuion that returns a number representing the drag force acting on thee whole cursor
     */
    getDrag;
    /**
     * A functuion that returns a number representing the offset of the cursor along the x-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getXOffset;
    /**
     * A functuion that returns a number representing the offset of the cursor along the y-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getYOffset;
    /**
     *
     * @param cursorOptions These are options that control the behavior of a pointer object and the defaults are:
     * ```
     * {
            pointers: null,
            hideMouse: true,
            drag: 0,
            xOffset: 0,
            yOffset: 0
        }
        ```
     */
    constructor(cursorOptions) {
        if (!cursorOptions.pointers) {
            throw ("You need to provide at least 1 pointer to the cursor");
        }
        const cursorOptionsDefaults = {
            pointers: null,
            secondaryPointers: cursorOptions.pointers,
            hideMouse: true,
            drag: 0,
            xOffset: 0,
            yOffset: 0
        };
        const newCursorOptions = Object.assign(cursorOptionsDefaults, cursorOptions);
        this.hideMouse = newCursorOptions.hideMouse;
        this.pointers = newCursorOptions.pointers;
        this.secondaryPointers = newCursorOptions.secondaryPointers;
        this.getDrag = () => {
            return newCursorOptions.drag;
        };
        this.getXOffset = () => {
            return newCursorOptions.xOffset;
        };
        this.getYOffset = () => {
            return newCursorOptions.yOffset;
        };
    }
}
/**
 * Class representing a pointer object.
 * @remarks You can have several pointer objects concurrently.
 * Each pointer object represents a literal "pointer".
 *
 * @example
const pointer1 = new Pointer({
    pointerShape: ['string', '👆'],
    size: 50,
    drag: 0.1,
    xCharOffset: 18,
    yCharOffset: 85,
    rotation: -40,
    xOffset: 0,
    yOffset: 0
})
 *
 */
class Pointer {
    pointerOptions;
    /**
     * Internal function used by the pointer to initialize itself on the canvas
     * @remarks This function calls the init function from the canvas drawing, a user should rarely have to call this function or the init function manually
     */
    startPointer;
    /**
     * Creates a pointer object
     *
     * @param pointerOptions These are options that control the behavior of a pointer object and the defaults are:
     * ```
     * {
            pointerShape: ['string','💧'],
            colors: ['default'],
            drag: 0,
            size: 50,
            rotation: 0,
            xCharOffset: 0,
            yCharOffset: 0,
            xOffset: 0,
            yOffset: 0
        }
        ```
     * @returns a Pointer object
     */
    constructor(pointerOptions) {
        const pointerOptionsDefaults = {
            pointerShape: ['string', '💧'],
            colors: ['default'],
            drag: 0,
            size: 50,
            rotation: 0,
            xCharOffset: 0,
            yCharOffset: 0,
            xOffset: 0,
            yOffset: 0,
        };
        // assigns default values to keys not manually defined in the pointer Options
        this.pointerOptions = Object.assign(pointerOptionsDefaults, pointerOptions);
        if (this.pointerOptions.pointerShape[0] === 'string') {
            this.startPointer = (canvas) => {
                const context = canvas.getContext('2d');
                init(canvas, context, objects, this);
            };
        }
        else if (this.pointerOptions.pointerShape[0] === 'image') {
            const src = this.pointerOptions.pointerShape[1];
            this.startPointer = (canvas) => {
                const context = canvas.getContext('2d');
                init(canvas, context, objects, this);
            };
        }
        else { // canvas drawing pointer 
            // TODO: implement the drawing pointer here
        }
    }
}
/**
 * Performs a bunch of initialization tasks for cursor drawing like:
 *  - Hiding the cursor if hideMouse is true
 *  - Checks device type. This is important since mobile/tablet devices do not use a cursor
 *  - Creates a canvas, without duplication, that all drawings will take place on and appends it to the DOM.
 *
 * @remarks
 * You will need to call this function at least once in a project.
 *
 * @param cursor - The main Cursor Object for the project, there should typically be 1 per project
 * @param objects - An array of Objects that implement both a draw and an update function e.g. the standard Character type built into the library
 * @returns A HTMLCanvasElement object that the cursor is drawn on
 */
function initializeCanvas(cursor, objects) {
    if (isDeviceMobileOrTablet()) {
        return undefined;
    }
    let cursorCanvas = document.querySelector('.curses-cursor-canvas');
    let cursorCanvasSecondary = document.querySelector('.curses-cursor-canvas-secondary');
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
        transition: opacity 0.4s, transform 0.2s;
        `;
        if (cursor.hideMouse) {
            const htmlElement = document.children[0];
            htmlElement.style.cursor = "none";
        }
        const allElements = document.body.querySelectorAll("*");
        allElements.forEach((element) => {
            if (element.tagName !== "SCRIPT" && element.tagName !== "CANVAS" && cursor.hideMouse) {
                element.style.cursor = "none";
            }
        });
        document.body.appendChild(cursorCanvas);
    }
    if (!cursorCanvasSecondary) {
        cursorCanvasSecondary = document.createElement('canvas');
        cursorCanvasSecondary.setAttribute('class', 'curses-cursor-canvas-secondary');
        cursorCanvasSecondary.width = window.innerWidth;
        cursorCanvasSecondary.height = window.innerHeight;
        cursorCanvasSecondary.style.cssText = `
        position: fixed;
        pointer-events:none;
        top: 0;
        left: 0;
        z-index: 10000;
        transform: translate(30px, 30px);
        transition: opacity 0.4s, transform 0.2s;
        opacity: 0;
        `;
        document.body.appendChild(cursorCanvasSecondary);
    }
    // normal canvas
    const ctx = cursorCanvas.getContext('2d');
    cursor.pointers.forEach(pointer => {
        pointer.startPointer(cursorCanvas);
    });
    const animId = syncAnimate(cursorCanvas, ctx);
    // secondary canvas
    const secondaryCtx = cursorCanvasSecondary.getContext('2d');
    cursor.secondaryPointers.forEach(secondaryPointer => {
        secondaryPointer.startPointer(cursorCanvasSecondary);
    });
    const animIdSecondary = syncAnimate(cursorCanvasSecondary, secondaryCtx);
    window.addEventListener("mouseover", (e) => {
        if (e.target && e.target.getAttribute("data-cursor") === "secondary") {
            cursorCanvas.style.opacity = "0";
            cursorCanvas.style.transform = "translate(30px, 30px)";
            cursorCanvasSecondary.style.opacity = "1";
            cursorCanvasSecondary.style.transform = "translate(0px, 0px)";
        }
        else {
            cursorCanvas.style.opacity = "1";
            cursorCanvas.style.transform = "translate(0, 0)";
            cursorCanvasSecondary.style.opacity = "0";
            cursorCanvasSecondary.style.transform = "translate(30px, 30px)";
        }
    });
    return () => {
        cursorCanvas.remove();
    };
}
function syncAnimate(canvas, context) {
    /**
     * This if statement checks if a particular canvas exists on the page before updating that canvas.
     * Without it, even though a canvas has been removed from the DOM it keeps updating in the background
     *
    */
    if (document.contains(canvas)) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const animId = requestAnimationFrame(() => {
            syncAnimate(canvas, context);
        });
        objects.forEach(objectChar => {
            animate(objectChar);
        });
        return animId;
    }
}
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.js.map