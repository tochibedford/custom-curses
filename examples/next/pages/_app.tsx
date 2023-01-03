import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { TCharacter } from 'custom-curses/dist/typesManual/types'
const customCurses = async () => await import('custom-curses')

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    customCurses().then(library => {
      const { Cursor, Pointer, initializeCanvas } = library
      let objects: TCharacter[] = []; //for typescript users

      const pointer1 = new Pointer(
        {
          pointerShape: ["string", "👆"],
          size: 50,
          drag: 0.1,
          xCharOffset: 9,
          yCharOffset: 40,
          rotation: -40,
          xOffset: 0,
          yOffset: 0,
        },
        objects
      );

      const pointer2 = new Pointer(
        {
          pointerShape: ["string", "🙂"],
          size: 20,
          drag: 0.5,
          xOffset: 50,
          yOffset: 50,
        },
        objects
      );

      const pointer3 = new Pointer(
        {
          pointerShape: ["string", "😲"],
          size: 20,
          drag: 0.7,
          xOffset: 70,
          yOffset: 70,
        },
        objects
      );

      const pointer4 = new Pointer(
        {
          pointerShape: ["string", "😶"],
          size: 20,
          drag: 0.8,
          xOffset: 90,
          yOffset: 90,
        },
        objects
      );

      const pointer5 = new Pointer(
        {
          pointerShape: ["string", "😣"],
          size: 20,
          drag: 0.89,
          xOffset: 110,
          yOffset: 110,
        },
        objects
      );

      const cursor1 = new Cursor({
        pointers: [pointer1, pointer2, pointer3, pointer4, pointer5],
        drag: 0, //where 1 is max
        hideMouse: true,
      });

      let canvasLol = initializeCanvas(cursor1, objects);
    })
  }, [])
  return <Component {...pageProps} />
}
