import { PointerObject, Character, focusPoint } from '../../typesManual/types';
declare function Character(x: number, y: number, dx: number, dy: number, rotation: number, character: string, drag: number, focusPoint: focusPoint, size: number, color: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pointer: PointerObject): void;
declare function init(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, objects: any, pointer: PointerObject): void;
declare function animate(objectChar: Character, pointer: PointerObject): void;
export { animate, init };
//# sourceMappingURL=index.d.ts.map