import { CursorObject, PointerObject, pointerOptionsInterface, Character } from "./types/types";
declare function Cursor(cursorOptions: any): CursorObject;
declare function Pointer(pointerOptions: pointerOptionsInterface, objects: any): PointerObject;
declare function initializeCanvas(cursor: CursorObject, objects: Character[]): HTMLCanvasElement;
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.d.ts.map