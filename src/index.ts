import { CursorObject, PointerObject, pointerOptionsInterface, cursorOptionsInterface, TCharacter, TImageCharacter, TElementCharacter } from "./typesManual/types"
import { animate, init } from "./pointer/index.js"
import { isDeviceMobileOrTablet } from "./detectMobileTablet.js"

const objects: (TCharacter | TImageCharacter | TElementCharacter)[] = []

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
class Cursor implements CursorObject {
    /**
     * A boolean value that determines whether the System cursor is hidden or not
     */
    hideMouse: boolean;
    /**
     * An array of all pointers being used by the cursor 
     */
    pointers: PointerObject[];
    /**
     * An array of all secondary pointers being used by the cursor 
     */
    secondaryPointers: PointerObject[];
    /**
     * A number in milliseconds representing how long it takes to switch from primary to secondary cursor
     */
    transition: number;
    /**
     * A functuion that returns a number representing the drag force acting on thee whole cursor
     */
    getDrag: () => number;
    /**
     * A functuion that returns a number representing the offset of the cursor along the x-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getXOffset: () => number;
    /**
     * A functuion that returns a number representing the offset of the cursor along the y-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getYOffset: () => number;

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
    constructor(cursorOptions: Partial<cursorOptionsInterface>) {
        if (!cursorOptions.pointers) {
            throw ("You need to provide at least 1 pointer to the cursor")
        }

        const cursorOptionsDefaults: cursorOptionsInterface = {
            pointers: null,
            secondaryPointers: [...cursorOptions.pointers],
            transition: 0,
            hideMouse: true,
            drag: 0,
            xOffset: 0,
            yOffset: 0
        }

        const newCursorOptions = Object.assign(cursorOptionsDefaults, cursorOptions)

        this.hideMouse = newCursorOptions.hideMouse;

        this.pointers = newCursorOptions.pointers

        this.secondaryPointers = newCursorOptions.secondaryPointers

        this.transition = newCursorOptions.transition

        this.getDrag = (): number => {
            return newCursorOptions.drag
        }

        this.getXOffset = (): number => {
            return newCursorOptions.xOffset
        }

        this.getYOffset = (): number => {
            return newCursorOptions.yOffset
        }
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
class Pointer implements PointerObject {
    pointerOptions: pointerOptionsInterface;
    /**
     * Internal function used by the pointer to initialize itself on the canvas
     * @remarks This function calls the init function from the canvas drawing, a user should rarely have to call this function or the init function manually
     */
    startPointer: (canvas?: HTMLCanvasElement) => void;

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
    constructor(pointerOptions: Partial<pointerOptionsInterface>) {

        const pointerOptionsDefaults: pointerOptionsInterface = {
            pointerShape: ['string', '💧'],
            colors: ['default'],
            drag: 0,
            size: 50,
            rotation: 0,
            xCharOffset: 0,
            yCharOffset: 0,
            xOffset: 0,
            yOffset: 0,
        }

        // assigns default values to keys not manually defined in the pointer Options
        this.pointerOptions = Object.assign(pointerOptionsDefaults, pointerOptions)
        if (this.pointerOptions.pointerShape[0] === 'string') {
            this.startPointer = (canvas) => {
                const context = canvas.getContext('2d')
                init(objects, this, canvas, context)
            }
        } else if (this.pointerOptions.pointerShape[0] === 'image') {
            const src = this.pointerOptions.pointerShape[1]
            this.startPointer = (canvas) => {
                const context = canvas.getContext('2d')
                init(objects, this, canvas, context)
            }
        } else { // element pointer 
            const element = this.pointerOptions.pointerShape[1]
            this.startPointer = () => {
                init(objects, this, element)
            }

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
 * @returns A HTMLCanvasElement object that the cursor is drawn on
 */

function initializeCanvas(cursor: CursorObject) { //creates a canvas if one is not there
    // TODO: Implement secondary cursor swap for element pointers
    if (isDeviceMobileOrTablet()) {
        cursor.pointers.forEach(pointer => {
            if (pointer.pointerOptions.pointerShape[0] === "element") {
                const element = pointer.pointerOptions.pointerShape[1]
                element.style.display = 'none'
            }
        })
        cursor.secondaryPointers.forEach(pointer => {
            if (pointer.pointerOptions.pointerShape[0] === "element") {
                const element = pointer.pointerOptions.pointerShape[1]
                element.style.display = 'none'
            }
        })
        return undefined // prevents initialization of canvas if device is mobile or a tablet
    }
    let cursorCanvas: HTMLCanvasElement = document.querySelector('.curses-cursor-canvas');
    let cursorCanvasSecondary: HTMLCanvasElement = document.querySelector('.curses-cursor-canvas-secondary');
    if (!cursorCanvas) {
        cursorCanvas = document.createElement('canvas')
        cursorCanvas.setAttribute('class', 'curses-cursor-canvas')
        cursorCanvas.width = window.innerWidth
        cursorCanvas.height = window.innerHeight
        cursorCanvas.style.cssText = `
        position: fixed;
        pointer-events:none;
        top: 0;
        left: 0;
        z-index: 10000;
        transition: opacity ${cursor.transition * 1000}ms, transform ${cursor.transition * 1000}ms;
        `
        if (cursor.hideMouse) {
            const htmlElement = document.children[0] as HTMLElement
            htmlElement.style.cursor = "none"
        }
        const allElements = document.body.querySelectorAll("*")
        allElements.forEach((element: HTMLElement) => {
            if (element.tagName !== "SCRIPT" && element.tagName !== "CANVAS" && cursor.hideMouse) {
                element.style.cursor = "none"
            }
        })

        document.body.appendChild(cursorCanvas)
    }
    if (!cursorCanvasSecondary) {
        cursorCanvasSecondary = document.createElement('canvas')
        cursorCanvasSecondary.setAttribute('class', 'curses-cursor-canvas-secondary')
        cursorCanvasSecondary.width = window.innerWidth
        cursorCanvasSecondary.height = window.innerHeight
        cursorCanvasSecondary.style.cssText = `
        position: fixed;
        pointer-events:none;
        top: 0;
        left: 0;
        z-index: 10000;
        transform: translate(30px, 30px);
        transition: opacity ${cursor.transition * 1000}ms, transform ${cursor.transition * 1000}ms;
        opacity: 0;
        `
        document.body.appendChild(cursorCanvasSecondary)
    }

    // normal canvas
    const ctx = cursorCanvas.getContext('2d')
    cursor.pointers.forEach(pointer => {
        pointer.startPointer(cursorCanvas)
    })

    const animId = syncAnimate(cursorCanvas, ctx)

    // secondary canvas
    const secondaryCtx = cursorCanvasSecondary.getContext('2d')
    cursor.secondaryPointers.forEach(secondaryPointer => {
        secondaryPointer.startPointer(cursorCanvasSecondary)
    })

    const animIdSecondary = syncAnimate(cursorCanvasSecondary, secondaryCtx)

    const handleMouseOver = (e: MouseEvent) => {
        if (e.target && (e.target as HTMLElement).getAttribute("data-cursor") === "secondary") {
            cursorCanvas.style.opacity = "0"
            cursorCanvas.style.transform = "translate(30px, 30px)"
            cursorCanvasSecondary.style.opacity = "1"
            cursorCanvasSecondary.style.transform = "translate(0px, 0px)"

            cursor.pointers.forEach(pointer => {
                if (pointer.pointerOptions.pointerShape[0] === "element") {
                    const element = pointer.pointerOptions.pointerShape[1]
                    element.style.opacity = "0"
                    element.style.transform = `translate(30px, 30px) rotate(${pointer.pointerOptions.rotation}deg))`
                    element.style.transition = `opacity ${cursor.transition * 1000}ms, transform ${cursor.transition * 1000}ms`
                }
            })
            cursor.secondaryPointers.forEach(pointer => {
                if (pointer.pointerOptions.pointerShape[0] === "element") {
                    const element = pointer.pointerOptions.pointerShape[1]
                    element.style.opacity = "1"
                    element.style.transform = `translate(0px, 0px) rotate(${pointer.pointerOptions.rotation}deg))`
                    element.style.transition = `opacity ${cursor.transition * 1000}ms, transform ${cursor.transition * 1000}ms`
                }
            })
        }
        else {
            cursorCanvas.style.opacity = "1"
            cursorCanvas.style.transform = "translate(0, 0)"
            cursorCanvasSecondary.style.opacity = "0"
            cursorCanvasSecondary.style.transform = "translate(30px, 30px)"

            cursor.pointers.forEach(pointer => {
                if (pointer.pointerOptions.pointerShape[0] === "element") {
                    const element = pointer.pointerOptions.pointerShape[1]
                    element.style.opacity = "1"
                    element.style.transform = `translate(0px, 0px) rotate(${pointer.pointerOptions.rotation}deg))`
                }
            })
            cursor.secondaryPointers.forEach(pointer => {
                if (pointer.pointerOptions.pointerShape[0] === "element") {
                    const element = pointer.pointerOptions.pointerShape[1]
                    element.style.opacity = "0"
                    element.style.transform = `translate(30px, 30px) rotate(${pointer.pointerOptions.rotation}deg))`
                }
            })
        }
    }

    // cause canvases to resize on window resize
    const handleResize = () => {
        cursorCanvas.width = window.innerWidth
        cursorCanvas.height = window.innerHeight
        cursorCanvasSecondary.width = window.innerWidth
        cursorCanvasSecondary.height = window.innerHeight
    }

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("resize", handleResize)

    return () => { // cleanup stuff 
        window.removeEventListener('mouseover', handleMouseOver)
        window.removeEventListener('resize', handleResize)
        cursorCanvas.remove()
        cursorCanvasSecondary.remove()
    }
}

function syncAnimate(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    /**
     * This if statement checks if a particular canvas exists on the page before updating that canvas.
     * Without it, even though a canvas has been removed from the DOM it keeps updating in the background
     * 
    */
    if (document.contains(canvas)) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        const animId = requestAnimationFrame(() => {
            syncAnimate(canvas, context)
        })

        objects.forEach(objectChar => {
            animate(objectChar)
        })

        return animId
    }
}

export {
    Cursor,
    Pointer,
    initializeCanvas
}