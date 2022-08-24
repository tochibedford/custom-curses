let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
function Character(x, y, dx, dy, character, drag, focusPoint, size, color, canvas, context) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.character = character;
    this.drag = drag;
    this.size = size;
    this.color = color;
    this.focusPoint = focusPoint;
    this.draw = () => {
        context.font = `${this.size}px serif`;
        context.textAlign = "center";
        context.fillText(this.character, this.x, this.y);
    };
    this.update = () => {
        if (this.x >= (canvas.width - this.size / 2) || this.x - this.size / 2 <= 0) {
            this.dx = (this.dx) * (1 - this.drag);
        }
        if (this.y + this.size / 2 >= (canvas.height) || this.y - this.size / 2 <= 0) {
            this.dy = (this.dy) - (1 - this.drag);
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}
function init(canvas, context, objects, pointer) {
    let focusPoint = {
        x: 0,
        y: 85
    };
    objects.push(new Character(canvas.width / 2, canvas.height / 2, 0, 0, pointer.pointerOptions.pointerShape[1], pointer.pointerOptions.drag, focusPoint, 100, `#4637a5`, canvas, context));
}
function animate(canvas, context, objects, objectIndex, pointer) {
    requestAnimationFrame(() => {
        animate(canvas, context, objects, objectIndex, pointer);
    });
    // context.clearRect(0, 0, canvas.width, canvas.height)
    // TODO: Implement canvas.clearRect for multiple pointers. Maybe using a counter in index.ts?
    // objects[objectIndex].x = mouse.x
    // objects[objectIndex].y = mouse.y
    objects[objectIndex].dx = ((mouse.x - objects[objectIndex].x) + pointer.pointerOptions.xOffset + objects[objectIndex].focusPoint.x) * (1 - pointer.pointerOptions.drag);
    objects[objectIndex].dy = ((mouse.y - objects[objectIndex].y) + pointer.pointerOptions.yOffset + objects[objectIndex].focusPoint.y) * (1 - pointer.pointerOptions.drag);
    objects[objectIndex].update();
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
let colors = [];
export { animate, init };
