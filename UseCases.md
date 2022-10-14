# How I would want a cursor library to be used

```
    import {Cursor, magicPointer} from 'custom-curses';
    import {crazyEffect} from 'custom-curses/effects';

    magicPointer = new magicPointer({
        colors: [#color, #color, #color], //allows a list of color strings in hex, if user puts too many it just takes the ones it needs
        drag: 1, //where 1 is max
        offset: {x,y},
        size: 1
    })

    cursor1 = new Cursor({
        pointers: [magicCursor, '💧', '👆'],
        drag: 1, //where 1 is max
        offset: {x,y}
    });

    
    cursor1.follow

```

Pointers can be anything, from a string to a Canvas drawing.

## Creating canvas drawings
Along with the predefined types in the types.ts file, the index.ts details the options for the Pointer objects and the Cursor object.
When creating canvas drawings, you will need to use make these options the driver of your canvas drawings. i.e. Pointer.pointerOptions.size should control your canvas drawing size in some way and Pointer.pointerOptions.rotation should control the angle at which your canvas drawing is rotated.

The implementation of how these options control your drawing is left up to you, and all you would need to provide/export out of you canvas drawing file are the; animate & init functions.

### -<b>init function</b>
```
init(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, objects, pointer:PointerObject)
```
This function in your drawing should accept canvas, context and objects, & pointer arguments.
In this function you should:
 - define a focus point for your pointer - a point on the x, y coordinate system that does the "pointing" <br/>
 - instantiate and push to the objects array an instance of your canvas drawing object.


### - <b>animate function</b>

```
animate(objectChar: Character, pointer: PointerObject)
```
In this function you can call your canvas drawin object's update function, or it's equivalent. you can also manually perform the position update tasks in ths function but it is neater to put it all in one update function.
`DO NOT USE THE requestAnimationFrame method here` - Although this is the norm in canvas drawings, you do not need to do this, this is to ensure that all animate functions are called only once during each animation frame. So all you need to do, is perform your update tasks and export this animation function.

// TODO Implement color scheming?