let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
function Character(x, y, dx, dy, rotation, character, drag, focusPoint, size, color, canvas, context, pointer) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rotation = rotation;
    this.character = character;
    this.drag = drag;
    this.size = size;
    this.color = color;
    this.focusPoint = focusPoint;
    this.pointer = pointer;
    this.draw = () => {
        context.save();
        context.translate(this.x - this.size, this.y);
        context.rotate((this.rotation * (Math.PI / 360)));
        context.font = `${this.size}px serif`;
        context.textAlign = "center";
        context.fillText(this.character, 0, 0);
        context.restore();
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
    objects.push(new Character(canvas.width / 2, canvas.height / 2, 0, 0, pointer.pointerOptions.rotation, pointer.pointerOptions.pointerShape[1], pointer.pointerOptions.drag, focusPoint, pointer.pointerOptions.size, `#4637a5`, canvas, context, pointer));
}
function animate(objectChar, pointer) {
    // TODO: Implement the pointer Template for future pointers
    // objectChar.x = mouse.x
    // objectChar.y = mouse.y
    objectChar.dx = ((mouse.x - objectChar.x) + pointer.pointerOptions.xOffset + objectChar.focusPoint.x) * (1 - pointer.pointerOptions.drag);
    objectChar.dy = ((mouse.y - objectChar.y) + pointer.pointerOptions.yOffset + objectChar.focusPoint.y) * (1 - pointer.pointerOptions.drag);
    objectChar.update();
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
export { animate, init };
//# sourceMappingURL=index.js.map