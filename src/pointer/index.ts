import { PointerObject, TCharacter, focusPoint, TImageCharacter, TElementCharacter } from '../typesManual/types'

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

/**
 * Character Object
 */
class Character implements TCharacter {
    x: number
    y: number
    dx: number
    dy: number
    rotation: number
    character: string
    drag: number
    size: number
    color: string
    focusPoint: focusPoint
    pointer: PointerObject
    draw: () => void
    update: () => void

    constructor(x: number, y: number, dx: number, dy: number, rotation: number, character: string, drag: number, focusPoint: focusPoint, size: number, color: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pointer: PointerObject) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rotation = rotation
        this.character = character
        this.drag = drag
        this.size = size
        this.color = color
        this.focusPoint = focusPoint
        this.pointer = pointer

        this.draw = () => {
            context.save()
            context.translate(this.x, this.y)
            context.rotate((this.rotation * (Math.PI / 180)))
            context.font = `${this.size}px serif`
            context.textAlign = "center"
            // context.fillStyle = 'red' /* use this to check context */
            // context.fillRect(0,0,100, 100)
            context.fillText(this.character, 0 + pointer.pointerOptions.xCharOffset + pointer.pointerOptions.xOffset, 0 + pointer.pointerOptions.yCharOffset + pointer.pointerOptions.yOffset)
            context.restore()
        }

        this.update = () => {
            if (this.x >= (canvas.width - this.size / 2) || this.x - this.size / 2 <= 0) {
                this.dx = (this.dx) * (1 - this.drag)
            } if (this.y + this.size / 2 >= (canvas.height) || this.y - this.size / 2 <= 0) {
                this.dy = (this.dy) - (1 - this.drag)
            }
            this.x += this.dx
            this.y += this.dy
            this.draw();
        }
    }
}


class ImageCharacter implements TImageCharacter {
    x: number
    y: number
    dx: number
    dy: number
    rotation: number
    src: HTMLImageElement
    drag: number
    size: number
    focusPoint: focusPoint
    pointer: PointerObject
    draw: () => void
    update: () => void

    constructor(x: number, y: number, dx: number, dy: number, rotation: number, src: HTMLImageElement, drag: number, focusPoint: focusPoint, size: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pointer: PointerObject) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rotation = rotation
        this.src = src
        this.drag = drag
        this.size = size
        this.focusPoint = focusPoint
        this.pointer = pointer
        this.draw = () => {
            context.save()
            context.translate(this.x, this.y)
            context.rotate((this.rotation * (Math.PI / 180)))
            context.drawImage(this.src, 0 + pointer.pointerOptions.xCharOffset + pointer.pointerOptions.xOffset, 0 + pointer.pointerOptions.yCharOffset + pointer.pointerOptions.yOffset, this.size, this.size)
            context.restore()
        }

        this.update = () => {
            if (this.x >= (canvas.width - this.size / 2) || this.x - this.size / 2 <= 0) {
                this.dx = (this.dx) * (1 - this.drag)
            } if (this.y + this.size / 2 >= (canvas.height) || this.y - this.size / 2 <= 0) {
                this.dy = (this.dy) - (1 - this.drag)
            }
            this.x += this.dx
            this.y += this.dy
            this.draw();
        }
    }
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
class ElementCharacter implements TElementCharacter {
    x: number
    y: number
    dx: number
    dy: number
    rotation: number
    element: HTMLElement
    drag: number
    focusPoint: focusPoint
    pointer: PointerObject
    draw: () => void
    update: () => void

    constructor(x: number, y: number, dx: number, dy: number, rotation: number, element: HTMLElement, drag: number, focusPoint: focusPoint, pointer: PointerObject) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rotation = rotation
        this.element = element
        this.drag = drag
        this.focusPoint = focusPoint
        this.pointer = pointer
        element.classList.add('element-pointer')
        element.style.cssText =
            `
                position: fixed; 
                left: ${this.x + pointer.pointerOptions.xOffset}px; 
                top: ${this.y + pointer.pointerOptions.yOffset}px; 
                transform: rotate(${this.rotation}deg);
                transition: opactiy 0s ease-in-out;
                pointer-events: none;
            `
        this.draw = () => {
            element.style.left = `${this.x + pointer.pointerOptions.xOffset}px`
            element.style.top = `${this.y + pointer.pointerOptions.yOffset}px`
            element.style.transform = `rotate(${this.rotation}deg)`
        }

        this.update = () => {
            if (this.x >= (window.innerWidth - element.getBoundingClientRect().width / 2) || this.x - element.getBoundingClientRect().width / 2 <= 0) {
                this.dx = (this.dx) * (1 - this.drag)
            } if (this.y + element.getBoundingClientRect().height / 2 >= (window.innerHeight) || this.y - element.getBoundingClientRect().height / 2 <= 0) {
                this.dy = (this.dy) - (1 - this.drag)
            }
            this.x += this.dx
            this.y += this.dy
            this.draw();
        }
    }
}

//overload function signature for init
function init(objects: (TCharacter | TImageCharacter | TElementCharacter)[], pointer: PointerObject, element?: HTMLElement): void
function init(objects: (TCharacter | TImageCharacter | TElementCharacter)[], pointer: PointerObject, canvas?: HTMLCanvasElement, context?: CanvasRenderingContext2D): void

function init(objects: (TCharacter | TImageCharacter | TElementCharacter)[], pointer: PointerObject, arg1: unknown, arg2?: unknown) {
    let focusPoint = {
        x: 0,
        y: 0
    }
    let x: number;
    let y: number;
    let rotation: number;
    let drag: number
    let size: number;

    if (objects.length === 0) {
        x = mouse.x
        y = mouse.y
        rotation = pointer.pointerOptions.rotation
        drag = pointer.pointerOptions.drag
        size = pointer.pointerOptions.size
    } else {
        // if there is an object already on the screen it initializes the new pointer to that last objects position. this removes the "jumping" when switching pointers, while a pointer is still in motion
        x = objects[objects.length - 1].x
        y = objects[objects.length - 1].y
        rotation = pointer.pointerOptions.rotation
        drag = pointer.pointerOptions.drag
        size = pointer.pointerOptions.size
    }

    if (arg1 instanceof HTMLElement && (arg1 instanceof HTMLCanvasElement === false)) {
        let element = arg1 as HTMLElement
        objects.push(new ElementCharacter(x, y, 0, 0, rotation, element, drag, focusPoint, pointer))

    } else {
        let canvas = arg1 as HTMLCanvasElement
        let context = arg2 as CanvasRenderingContext2D

        if (pointer.pointerOptions.pointerShape[0] === "string") {
            const str = pointer.pointerOptions.pointerShape[1]
            objects.push(new Character(x, y, 0, 0, rotation, str, drag, focusPoint, size, `#4637a5`, canvas, context, pointer))
        } else if (pointer.pointerOptions.pointerShape[0] === "image") {
            const str = pointer.pointerOptions.pointerShape[1]
            objects.push(new ImageCharacter(x, y, 0, 0, rotation, str, drag, focusPoint, size, canvas, context, pointer))
        } else {
            throw new Error("pointerShape is not a string or image or an instance of HTMLElement")
        }

    }
}

/**
 * This function calls the update function of the Character objects so actions that need to be performed between every frame can be placed here
 * 
 * @param objectChar an object that implements at least draw & update methods
 * @param pointer this is the pointer object that the Character is bound to
 */
function animate(objectChar: TCharacter | TImageCharacter | TElementCharacter) {

    // objectChar.x = mouse.x
    // objectChar.y = mouse.y
    objectChar.dx = ((mouse.x - objectChar.x) + objectChar.focusPoint.x) * (1 - objectChar.pointer.pointerOptions.drag)
    objectChar.dy = ((mouse.y - objectChar.y) + objectChar.focusPoint.y) * (1 - objectChar.pointer.pointerOptions.drag)
    objectChar.update()

}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

export { animate, init, Character, ImageCharacter, ElementCharacter }