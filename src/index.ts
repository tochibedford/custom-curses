import {CursorObject, PointerObject, pointerOptionsInterface, cursorOptionsInterface, TCharacter, focusPoint, CanvasObject} from "./typesManual/types"
import {animate, init, Character} from "./pointers/characterFollower/index.js"
import { isDeviceMobileOrTablet } from "./detectMobileTablet.js"

/**
 * Class representing a Cursor object.
 * @remarks You can have only one Cursor object in a project. 
 * The Cursor object houses the various pointer objects you have created, and each of the pointers follow the curor as a kind of parent
 * 
 * @example
 * const cursor1 = new Cursor({
    pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
    drag: 0, //where 1 is max
    hideMouse: true,
});
 * 
 */
class Cursor implements CursorObject {
    /**
     * A boolean value that determines whether the System cursor is hidden or not
     */
    hideMouse;
    /**
     * A function that returns an array of all pointers being used by the cursor 
     */
    getPointers: ()=>PointerObject[];
    /**
     * A functuion that returns a number representing the drag force acting on thee whole cursor
     */
    getDrag: ()=>number;
    /**
     * A functuion that returns a number representing the offset of the cursor along the x-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getXOffset: ()=>number;
    /**
     * A functuion that returns a number representing the offset of the cursor along the y-axis, this can be used to set where the point that does the "pointing" on the cursor is.
     */
    getYOffset: ()=>number;

    /**
     * 
     * @param cursorOptions These are options that control the behavior of a pointer object and the defaults are:
     * ```
     * {
            pointers: null,
            hideMouse: true,
            drag: 0,
            xOffset: 0,
            yOffset: 0
        }
        ```
     */
    constructor (cursorOptions: cursorOptionsInterface){
        if (cursorOptions.pointers){
            throw ("You need to provide at least 1 pointer to the cursor")
        }

        const cursorOptionsDefaults: cursorOptionsInterface = {
            pointers: null,
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
    
        this.getPointers = (): PointerObject[] =>{
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
    }
}

/**
 * Class representing a pointer object.
 * @remarks You can have several pointer objects concurrently. 
 * Each pointer object represents a literal "pointer".
 * 
 * @example
const pointer1 = new Pointer({
    pointerShape: ['string', '👆'],
    size: 50,
    drag: 0.1,
    xCharOffset: 18,
    yCharOffset: 85,
    rotation: -40,
    xOffset: 0,
    yOffset: 0
}, objects)
 * 
 */
class Pointer implements PointerObject{
    pointerOptions: pointerOptionsInterface;
    /**
     * Internal function used by the pointer to initialize itself on the canvas
     * @remarks This function calls the init function from the canvas drawing, a user should rarely have to call this function or the init function manually
     */
    startPointer: ()=>void;

    /**
     * Creates a pointer object
     * 
     * @param pointerOptions These are options that control the behavior of a pointer object and the defaults are:
     * ```
     * {
            pointerShape: ['string','💧'],
            colors: ['default'],
            drag: 0,
            size: 50,
            rotation: 0,
            xCharOffset: 0,
            yCharOffset: 0,
            xOffset: 0,
            yOffset: 0
        }
        ```
     * @param objects - An array of Objects that implement both a draw and an update function e.g. the standard Character type built into the library 
     * @returns a Pointer object
     */
    constructor(pointerOptions: pointerOptionsInterface, objects: TCharacter[]) {

        const pointerOptionsDefaults: pointerOptionsInterface = {
            pointerShape: ['string','💧'],
            colors: ['default'],
            drag: 0,
            size: 50,
            rotation: 0,
            xCharOffset: 0,
            yCharOffset: 0,
            xOffset: 0,
            yOffset: 0
        }
    
        this.pointerOptions = Object.assign({}, pointerOptions)
        // assigns default values to keys not manually defined in the pointer Options
        Object.keys(pointerOptionsDefaults).forEach(property=> {
            if(pointerOptions.hasOwnProperty(property))
                this.pointerOptions[property] = pointerOptions[property as keyof pointerOptionsInterface]
            else
                this.pointerOptions[property] = pointerOptionsDefaults[property as keyof pointerOptionsInterface]
        });
    
        if(this.pointerOptions.pointerShape[0]==='string'){
            this.startPointer = ()=>{
                const canvas:HTMLCanvasElement = document.querySelector('.curses-cursor-canvas')
                const context = canvas.getContext('2d')
                init(canvas, context, objects, this)
            }
        }else if(this.pointerOptions.pointerShape[0]==='image'){
            
        } else { // canvas drawing pointer 
            // TODO: implement the drawing pointer here

        }
    }
}

/**
 * Performs a bunch of initialization tasks for cursor drawing like: 
 *  - Hiding the cursor if hideMouse is true
 *  - Checks device type. This is important since mobile/tablet devices do not use a cursor
 *  - Creates a canvas, without duplication, that all drawings will take place on and appends it to the DOM. 
 * 
 * @remarks
 * You will need to call this function at least once in a project.
 * 
 * @param cursor - The main Cursor Object for the project, there should typically be 1 per project
 * @param objects - An array of Objects that implement both a draw and an update function e.g. the standard Character type built into the library 
 * @returns A HTMLCanvasElement object that the cursor is drawn on
 */

function initializeCanvas(cursor: CursorObject, objects: TCharacter[]){ //creates a canvas if one is not there
    if(isDeviceMobileOrTablet()){
        console.log(isDeviceMobileOrTablet())
        return undefined
    }
    let cursorCanvas:HTMLCanvasElement = document.querySelector('.curses-cursor-canvas');
    if(!cursorCanvas){
        cursorCanvas = document.createElement('canvas')
        cursorCanvas.setAttribute('class', 'curses-cursor-canvas')
        cursorCanvas.width = window.innerWidth
        cursorCanvas.height = window.innerHeight
        cursorCanvas.style.cssText = `
        position: fixed;
        pointer-events:none;
        top: 0;
        left: 0;
        z-index: 10000;
        `
        if(cursor.hideMouse){
            const htmlElement = document.children[0] as HTMLElement
            htmlElement.style.cursor = "none"
        }
        const allElements = document.body.querySelectorAll("*")
        allElements.forEach((element: HTMLElement)=>{
            if (element.tagName !== "SCRIPT" && element.tagName !== "CANVAS" && cursor.hideMouse) {
                element.style.cursor = "none"
            }
        })

        document.body.appendChild(cursorCanvas)
    }
    
    const ctx = cursorCanvas.getContext('2d')
    cursor.getPointers().forEach(pointer=>{
        pointer.startPointer()
    })
    
    syncAnimate(objects, cursorCanvas, ctx)
    
    return cursorCanvas
}

function syncAnimate(objects: TCharacter[], canvas:HTMLCanvasElement, context:CanvasRenderingContext2D){
    context.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(()=>{
        syncAnimate(objects, canvas, context)
    })

    objects.forEach(objectChar=>{
        animate(objectChar, objectChar.pointer)
    }) 

}

export {
    Cursor, 
    Pointer, 
    initializeCanvas
}