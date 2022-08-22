

let gravity = 0;
let friction = 0.09;
let mouse = {
  x: window.innerWidth/2,
  y: window.innerHeight/2
}

const colors = [
  '#2185C532',
  '#7ECEFD',
  '#FFF6E5',
  '#FF7F66'
]

window.addEventListener('mousemove', (e)=>{
  mouse.x = e.clientX
  mouse.y = e.clientY
})

function Circle(x, y, dx, dy, radius, color, canvas, ctx){
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color  = color
  const originalRadius = radius
  
  this.draw = function(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  
  this.update = function(){
    if(this.x + this.radius +this.dx>canvas.width||this.x - this.radius + this.dx<0){
      this.dx = -(this.dx*friction)
    }
    if(this.y + this.radius + this.dy>canvas.height || this.y - this.radius + this.dy < 0){
      this.dy = -(this.dy*friction)
      this.dx = this.dx*friction
    }
    this.dy += gravity
    this.y += this.dy
    this.x += this.dx
    this.draw()
    
  }
}
// let circle1;
// let circle2;
function init(canvasEx, ctxEx, objects, cursor) {
    // objects.push(new Circle(canvasEx.width / 2, canvasEx.height / 2, 0, 0, 100, 'black', canvasEx, ctxEx))
    objects.push(new Circle(0, 0, 0, 0, 30, colors[0], canvasEx, ctxEx))
}
function animate(canvasEx, ctxEx, objects, cursor){
    requestAnimationFrame(()=>{animate(canvasEx, ctxEx, objects, cursor)});
    ctxEx.clearRect(0, 0, canvasEx.width, canvasEx.height);
    // objects[0].update();
    // objects[0].x = mouse.x;
    // objects[0].y = mouse.y;
    objects[0].dx = (mouse.x-objects[0].x + cursor.getXOffset())*friction;
    objects[0].dy = (mouse.y-objects[0].y + cursor.getYOffset())*friction;
    objects[0].update();
    // if (getDistance(objects[0].x, objects[0].y, objects[1].x, objects[1].y) <= objects[0].radius + objects[1].radius) {
    //     objects[0].color = 'red';
    // }
    // else {
    //     objects[0].color = 'black';
    // }
}
// const objects1 = []
// init(canvas, ctx, objects1);
// animate(canvas, ctx, objects1);

export {animate, init}
