/**
 * jumping right into typescript for the first time by writing a library
 */
import { CursorObject, PointerObject, pointerOptionsInterface, Character } from "./types/types";
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
declare function Cursor(cursorOptions: any): CursorObject;
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
declare function Pointer(pointerOptions: pointerOptionsInterface, objects: any): PointerObject;
declare function initializeCanvas(cursor: CursorObject, objects: Character[]): HTMLCanvasElement;
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.d.ts.map