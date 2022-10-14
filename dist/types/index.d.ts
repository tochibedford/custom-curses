import { CursorObject, PointerObject, pointerOptionsInterface, Character } from "./typesManual/types";
declare class Cursor implements CursorObject {
    hideMouse: any;
    getPointers: any;
    getDrag: any;
    getXOffset: any;
    getYOffset: any;
    constructor(cursorOptions: any);
}
declare class Pointer implements PointerObject {
    pointerOptions: any;
    startPointer: any;
    constructor(pointerOptions: pointerOptionsInterface, objects: any);
}
declare function initializeCanvas(cursor: CursorObject, objects: Character[]): HTMLCanvasElement;
export { Cursor, Pointer, initializeCanvas };
//# sourceMappingURL=index.d.ts.map