interface cursorOptionsInterface {
    pointers?: string[];
    hideMouse?: boolean;
    drag?: number;
    xOffset?: number;
    yOffset?: number;
}
interface pointerOptionsInterface {
    pointerShape?: string[];
    colors?: string[];
    rotation?: number;
    drag?: number;
    size?: number;
    xCharOffset?: number;
    yCharOffset?: number;
    xOffset?: number;
    yOffset?: number;
}
interface PointerObject {
    pointerOptions: pointerOptionsInterface;
    startPointer(): void;
}
interface CursorObject {
    hideMouse: boolean;
    getPointers(): PointerObject[];
    getDrag(): number;
    getXOffset(): number;
    getYOffset(): number;
}
declare type focusPoint = {
    x: number;
    y: number;
};
declare type Character = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    rotation: number;
    character: string;
    focusPoint: focusPoint;
    size: number;
    pointer: PointerObject;
    color: string;
    draw(): void;
    update(): void;
};
export { CursorObject, PointerObject, pointerOptionsInterface, cursorOptionsInterface, focusPoint, Character };
//# sourceMappingURL=types.d.ts.map