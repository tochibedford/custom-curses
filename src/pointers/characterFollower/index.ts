import {PointerObject} from '../../types/types'

let mouse = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

type Character = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    character: string,
    focusPoint: focusPoint,
    size: number,
    color: string,
    animated: boolean,
    draw(): void
    update(): void
}

type focusPoint = {
    x: number,
    y: number
}

function Character(x: number, y:number, dx:number, dy:number, character:string, drag: number, focusPoint: focusPoint, size:number, color:string, canvas:HTMLCanvasElement, context:CanvasRenderingContext2D){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.character = character
    this.drag = drag
    this.size = size
    this.color = color
    this.focusPoint = focusPoint
    this.animated = false

    this.draw = ()=>{
        context.font = `${this.size}px serif`
        context.textAlign = "center"
        context.fillText(this.character, this.x, this.y)
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


function init(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, objects, pointer:PointerObject){
    let focusPoint = {
        x: 0,
        y: 85
    }
    objects.push(new Character(canvas.width/2, canvas.height/2, 0, 0, pointer.pointerOptions.pointerShape[1], pointer.pointerOptions.drag, focusPoint, pointer.pointerOptions.size, `#4637a5`, canvas, context))
}

function animate(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, objects: Character[], objectIndex: number, pointer: PointerObject) {
    requestAnimationFrame(()=>{
        animate(canvas, context, objects, objectIndex, pointer)
    })
    // context.clearRect(0, 0, canvas.width, canvas.height)
    // TODO: Implement the cleanCanvas mechanism asychronously and independent of the animate functions?
    
    // this is blocking and probably inefficient as it will itterate the list twice
    objects[objectIndex].animated = true
    const animatedList = objects.map((obj)=>{
        return obj.animated
    })
    const cleanCanvas = animatedList.reduce((prev, curr)=>{
        return prev && curr
    })
    if(cleanCanvas){
        context.clearRect(0, 0, canvas.width, canvas.height)
        objects.forEach(obj=>{
            obj.animated = false
        })
    }
    // objects[objectIndex].x = mouse.x
    // objects[objectIndex].y = mouse.y
    objects[objectIndex].dx = ((mouse.x-objects[objectIndex].x) + pointer.pointerOptions.xOffset + objects[objectIndex].focusPoint.x)*(1-pointer.pointerOptions.drag)
    objects[objectIndex].dy = ((mouse.y-objects[objectIndex].y) + pointer.pointerOptions.yOffset + objects[objectIndex].focusPoint.y)*(1-pointer.pointerOptions.drag)
    objects[objectIndex].update()

}

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})


let colors = []

export {animate, init}