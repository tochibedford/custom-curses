type pathUrl = string

/**
 * Defines shape of options for cursor objects
 */
type cursorOptionsInterface = {
    pointers?: PointerObject[] | null,
    hideMouse?: boolean,
    drag?: number,
    xOffset?: number,
    yOffset?: number
}

/**
 * Defines shape of options for pointer objects
 */
type pointerOptionsInterface = {
    pointerShape?: ["string" | "image" | "drawing", string | pathUrl],
    colors?: string[],
    rotation?: number,
    drag?: number,
    size?: number,
    xCharOffset?: number,
    yCharOffset?: number,
    xOffset?: number,
    yOffset?: number,
}

/**
 * Defines a Pointer Class interface
 */
interface PointerObject {
    pointerOptions: pointerOptionsInterface,
    startPointer: () => void
}

/**
 * Defines a Cursor Class interface
 */
type CursorObject = {
    hideMouse: boolean,
    getPointers: () => PointerObject[],
    getDrag: () => number,
    getXOffset: () => number,
    getYOffset: () => number,
}

/**
 * Defines a point where the "origin" of the pointer is
 */
type focusPoint = {
    x: number,
    y: number
}

type CanvasObject = {
    draw: () => void,
    update: () => void
}

/**
 * Defines a type for the standard canvas "Character" object that accepts strings and emojis
 */
type TCharacter = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    rotation: number,
    character: string,
    focusPoint: focusPoint,
    size: number,
    pointer: PointerObject,
    color: string
} & CanvasObject

/**
 * Defines a type for the standard canvas "ImageCharacter" object that is used in an image pointer
 */
type TImageCharacter = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    rotation: number,
    src: pathUrl,
    image: HTMLImageElement
    focusPoint: focusPoint,
    size: number,
    pointer: PointerObject,
} & CanvasObject

export {
    CursorObject,
    PointerObject,
    pointerOptionsInterface,
    cursorOptionsInterface,
    focusPoint,
    TCharacter,
    TImageCharacter,
    CanvasObject,
    pathUrl
}