import { PointerObject, TCharacter, focusPoint, TImageCharacter } from '../../typesManual/types';
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
declare function init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, objects: (TCharacter | TImageCharacter)[], pointer: PointerObject): void;
/**
 * This function calls the update function of the Character objects so actions that need to be performed between every frame can be placed here
 *
 * @param objectChar an object that implements at least draw & update methods
 * @param pointer this is the pointer object that the Character is bound to
 */
declare function animate(objectChar: TCharacter, pointer: PointerObject): void;
export { animate, init, Character };
//# sourceMappingURL=index.d.ts.map