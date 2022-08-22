function randomIntFromRange(min: number, max: number): number{
    return Math.floor(Math.random()*(max-min+1)+min)
}

function randomColor(colors: string[]): string{
    return colors[Math.floor(Math.random()*colors.length)]
}

function getDistance(x1:number,y1:number,x2:number,y2:number):number{
    let xDistance = x2-x1
    let yDistance = y2-y1

    //using the pythagorean theorem
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}