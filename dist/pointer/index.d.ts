import { PointerObject, TCharacter, focusPoint, TImageCharacter, TElementCharacter } from '../typesManual/types';
/**
 * Character Object
 */
declare class Character implements TCharacter {
    x: number;
    y: number;
    dx: number;
    dy: number;
    rotation: number;
    character: string;
    drag: number;
    size: number;
    color: string;
    focusPoint: focusPoint;
    pointer: PointerObject;
    draw: () => void;
    update: () => void;
    constructor(x: number, y: number, dx: number, dy: number, rotation: number, character: string, drag: number, focusPoint: focusPoint, size: number, color: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pointer: PointerObject);
}
declare class ImageCharacter implements TImageCharacter {
    x: number;
    y: number;
    dx: number;
    dy: number;
    rotation: number;
    src: HTMLImageElement;
    drag: number;
    size: number;
    focusPoint: focusPoint;
    pointer: PointerObject;
    draw: () => void;
    update: () => void;
    constructor(x: number, y: number, dx: number, dy: number, rotation: number, src: HTMLImageElement, drag: number, focusPoint: focusPoint, size: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pointer: PointerObject);
}
/**
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} dx - x velocity
 * @param {number} dy - y velocity
 * @param {number} rotation - rotation of element
 * @param {HTMLElement} element - element to be displayed
 * @param {number} drag - drag of element
 * @param {focusPoint} focusPoint - focus point of element
 * @param {PointerObject} pointer - pointer object
 */
declare class ElementCharacter implements TElementCharacter {
    x: number;
    y: number;
    dx: number;
    dy: number;
    rotation: number;
    element: HTMLElement;
    drag: number;
    focusPoint: focusPoint;
    pointer: PointerObject;
    draw: () => void;
    update: () => void;
    constructor(x: number, y: number, dx: number, dy: number, rotation: number, element: HTMLElement, drag: number, focusPoint: focusPoint, pointer: PointerObject);
}
declare function init(objects: (TCharacter | TImageCharacter | TElementCharacter)[], pointer: PointerObject, element?: HTMLElement): void;
declare function init(objects: (TCharacter | TImageCharacter | TElementCharacter)[], pointer: PointerObject, canvas?: HTMLCanvasElement, context?: CanvasRenderingContext2D): void;
/**
 * This function calls the update function of the Character objects so actions that need to be performed between every frame can be placed here
 *
 * @param objectChar an object that implements at least draw & update methods
 * @param pointer this is the pointer object that the Character is bound to
 */
declare function animate(objectChar: TCharacter | TImageCharacter | TElementCharacter): void;
export { animate, init, Character, ImageCharacter, ElementCharacter };
//# sourceMappingURL=index.d.ts.map