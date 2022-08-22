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

Pointers can be anything, from a string to a Pointer object.


## To-Do
Write some pointers to understudy how the canvas works