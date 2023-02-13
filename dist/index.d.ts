import { CursorObject, PointerObject, pointerOptionsInterface, cursorOptionsInterface } from "./typesManual/types";
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
declare class Cursor implements CursorObject {
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
    constructor(cursorOptions: Partial<cursorOptionsInterface>);
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
declare class Pointer implements PointerObject {
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
    constructor(pointerOptions: Partial<pointerOptionsInterface>);
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
declare function initializeCanvas(cursor: CursorObject): () => void;
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.d.ts.map