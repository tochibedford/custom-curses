function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    //using the pythagorean theorem
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
//# sourceMappingURL=helpers.js.map