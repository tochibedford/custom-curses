import {PointerObject, TCharacter, focusPoint} from '../../typesManual/types'

let mouse = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

/**
 * Character Object
 */
class Character implements TCharacter{
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
    pointer:PointerObject
    draw: ()=>void
    update: ()=>void

    constructor(x: number, y:number, dx:number, dy:number, rotation: number, character: string, drag: number, focusPoint: focusPoint, size:number, color:string, canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, pointer: PointerObject){
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

        this.draw = ()=>{
            context.save()
            context.translate(this.x, this.y)
            context.rotate((this.rotation * (Math.PI/180)))
            context.font = `${this.size}px serif`
            context.textAlign = "center"
            // context.fillStyle = 'red' /* use this to check context */
            // context.fillRect(0,0,100, 100)
            context.fillText(this.character, 0+pointer.pointerOptions.xCharOffset, 0+pointer.pointerOptions.yCharOffset)
            context.restore()
        }

        this.update = ()=>{
            if(this.x >= (canvas.width - this.size/2) || this.x - this.size/2 <= 0){
                this.dx = (this.dx)*(1-this.drag)
            }if(this.y + this.size/2 >= (canvas.height) || this.y - this.size/2<= 0){
                this.dy = (this.dy)-(1-this.drag)
            }
            this.x += this.dx 
            this.y += this.dy 
            this.draw();
        }
    }
}


function init(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, objects: TCharacter[], pointer:PointerObject){
    let focusPoint = {
        x: 0,
        y: 0
    }
    objects.push(new Character(canvas.width/2, canvas.height/2, 0, 0, pointer.pointerOptions.rotation, pointer.pointerOptions.pointerShape[1], pointer.pointerOptions.drag, focusPoint, pointer.pointerOptions.size, `#4637a5`, canvas, context, pointer))
}

/**
 * This function calls the update function of the Character objects so actions that need to be performed between every frame can be placed here
 * 
 * @param objectChar an object that implements at least draw & update methods
 * @param pointer this is the pointer object that the Character is bound to
 */
function animate(objectChar: TCharacter, pointer: PointerObject) {
    // TODO: Implement the pointer Template for future pointers
    
    // objectChar.x = mouse.x
    // objectChar.y = mouse.y
    objectChar.dx = ((mouse.x-objectChar.x) + pointer.pointerOptions.xOffset + objectChar.focusPoint.x)*(1-pointer.pointerOptions.drag)
    objectChar.dy = ((mouse.y-objectChar.y) + pointer.pointerOptions.yOffset + objectChar.focusPoint.y)*(1-pointer.pointerOptions.drag)
    objectChar.update()

}

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})


export {animate, init, Character}