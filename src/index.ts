/**
 * jumping right into typescript for the first time by writing a library
 */
import {CursorObject, PointerObject, pointerOptionsInterface, cursorOptionsInterface} from "./types/types"
import {animate, init} from "./pointers/characterFollower/index.js"

// is this necessary?


/**
 * 
 * Returns a cursor object
 * 
 * @param {Object} cursorOptions - options for the cursor 
 * @param {Array[string]} cursorOptions.pointers - List of all pointers you want to use for the cursor
 * @param {Boolean} cursorOptions.hideCursor - Hides the user default mouse if set to `true`
 * @param {Number} cursorOptions.drag - Number from 0-1 indicating how damped you want the cursor when following the mouse position
 * @param {Number} cursorOptions.xOffset - Number showing the x offset of the cursor
 * @param {Number} cursorOptions.yOffset - Number showing the y offset of the cursor
 * 
 * @returns A Cursor type
 */
function Cursor(cursorOptions): CursorObject{
    
    const cursorOptionsDefaults: cursorOptionsInterface = {
        pointers: ['default'],
        hideMouse: true,
        drag: 0,
        xOffset: 0,
        yOffset: 0
    }
    
    const newCursorOptions: cursorOptionsInterface = Object.assign({}, cursorOptions)
    
    // assigns default values to keys not manually defined in the cursor Options
    Object.keys(cursorOptionsDefaults).forEach(property => {
        if(cursorOptions.hasOwnProperty(property))
            newCursorOptions[property] = cursorOptions[property]
        else
            newCursorOptions[property] = cursorOptionsDefaults[property]
            
    });
    
    this.hideMouse = newCursorOptions.hideMouse;

    this.getPointers = ():string[]=>{
        return newCursorOptions.pointers
    }

    this.getDrag = ():number =>{
        return newCursorOptions.drag
    }

    this.getXOffset = ():number=>{
        return newCursorOptions.xOffset
    }

    this.getYOffset = ():number=>{
        return newCursorOptions.yOffset
    }

    return this
}

/**
 * 
 * @param {Object} pointerOptions - options for the pointer
 * @param {Array[string]} pointerOptions.colors - List of all colors you want to use for the pointer
 * @param {Number} pointerOptions.drag - Number from 0-1 indicating how damped you want the pointer when following the cursor position
 * @param {Number} pointerOptions.xOffset - Number showing the x offset of the pointer
 * @param {Number} pointerOptions.yOffset - Number showing the y offset of the pointer
 */
function Pointer(pointerOptions: pointerOptionsInterface, objects): PointerObject{
    const pointerOptionsDefaults: pointerOptionsInterface = {
        pointerShape: ['string','💧'],
        colors: ['default'],
        size: 50,
        drag: 0,
        xOffset: 0,
        yOffset: 0
    }

    this.animated = false
    this.pointerOptions = Object.assign({}, pointerOptions)
    // assigns default values to keys not manually defined in the pointer Options
    Object.keys(pointerOptionsDefaults).forEach(property => {
        if(pointerOptions.hasOwnProperty(property))
            this.pointerOptions[property] = pointerOptions[property]
        else
            this.pointerOptions[property] = pointerOptionsDefaults[property]
    });

    if(this.pointerOptions.pointerShape[0]=='string'){
        this.startPointer = ()=>{
            const canvas:HTMLCanvasElement = document.querySelector('.curses-cursor-canvas')
            const context = canvas.getContext('2d')
            init(canvas, context, objects, this)
            animate(canvas, context, objects, objects.length-1, this)
        }
    }else{
        // TODO: implement a secondary type of pointer here
    }

    return this
}

function initializeCanvas(cursor: CursorObject){ //creates a canvas if one is not there
    let cursorCanvas:HTMLCanvasElement = document.querySelector('.curses-cursor-canvas');
    if(!cursorCanvas){
        cursorCanvas = document.createElement('canvas')
        cursorCanvas.setAttribute('class', 'curses-cursor-canvas')
        cursorCanvas.width = window.innerWidth
        cursorCanvas.height = window.innerHeight
        cursorCanvas.style.cssText = `
            position: absolute;
            pointer-events:none;
            top: 0;
            left: 0;
        `
        document.querySelector('html').style.cursor = `${(cursor.hideMouse)? "none": "auto"}`
        document.querySelector('a').style.cursor = `${(cursor.hideMouse)? "none": "pointer"}`
        document.querySelector('button').style.cursor = `${(cursor.hideMouse)? "none": "auto"}`
        document.body.appendChild(cursorCanvas)
    }

    const ctx = cursorCanvas.getContext('2d')
    cursor.getPointers().forEach(pointer=>{
        pointer.startPointer()
    })
    
    
    return cursorCanvas
}



export {
    Cursor, 
    Pointer, 
    initializeCanvas,
    CursorObject
}