
interface cursorOptionsInterface {
    pointers?: string[],
    hideMouse?: boolean,
    drag?: number,
    xOffset?: number,
    yOffset?: number
}

interface pointerOptionsInterface {
    pointerShape?: string[],
    colors?: string[],
    drag?: number,
    size?: number,
    xOffset?: number,
    yOffset?: number,
}

interface PointerObject {
    pointerOptions: pointerOptionsInterface,
    startPointer(): void
}

interface CursorObject {
    hideMouse: boolean,
    getPointers(): PointerObject[],
    getDrag(): number,
    getXOffset(): number,
    getYOffset(): number,
}

export {CursorObject,
        PointerObject,
        pointerOptionsInterface,
        cursorOptionsInterface}