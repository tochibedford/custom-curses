
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

type focusPoint = {
    x: number,
    y: number
}

type Character = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    character: string,
    focusPoint: focusPoint,
    size: number,
    pointer: PointerObject,
    color: string,
    draw(): void
    update(): void
}

export {CursorObject,
        PointerObject,
        pointerOptionsInterface,
        cursorOptionsInterface,
        focusPoint,
        Character
    }