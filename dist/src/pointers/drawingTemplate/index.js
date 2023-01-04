let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
function drawingObject(x, y, dx, dy, character, drag, focusPoint, size, color, canvas, context, pointer) {
    // construct the object here
    // add a draw method
    this.draw = () => { };
    // add an update method
    this.update = () => { };
}
function init(canvas, context, objects, pointer) {
    let focusPoint = {
        x: 0,
        y: 0
    };
    // objects.push(new drawingObject(canvas.width / 2, canvas.height / 2, 0, 0, pointer.pointerOptions.pointerShape[1], pointer.pointerOptions.drag, focusPoint, pointer.pointerOptions.size, `#4637a5`, canvas, context, pointer))
}
// function animate(drawingObject, pointer: PointerObject) { }
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
export {};
// export { animate, init }
//# sourceMappingURL=index.js.map