# React Canvas App

This is a demo and starter template for an interactive canvas based animation. I use it in personal projects for experimenting in generative art and physics simulations. 

## Quick start

- Pull done a copy with degit: `npx degit https://github.com/luke-codewalker/react-canvas-app#main <your-project-name>`. 
- Install all dependencies with `npm i`
- Run it in development mode with `npm start`  

## Customize

To customize the app there are two places to edit, depending on what you want to do:

### Animation in `src/art/draw.ts`
This file contains the code for setting up and running your animation frame by frame. It is essentially a factory function that receives the canvas, the drawing context and any custom external dependencies you speficy. 

```ts
import { Animation } from "../lib/canvas";
const size = 20;

export const draw: Animation<[number]> = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, [stepSize]) => {
    // this code is run before the animation whenever the external dependencies change
    let x = 0;
    const y = canvas.height / 2;
    context.fillStyle = '#333';

    // this function is called to paint each frame of the animation
    return frameCount => {
        // this is a closure so we can access anything from setup
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(x, y, size, size);
        x = (x + stepSize) % canvas.width;

        // you can stop the animation anytime by returning true (it can only be restarted by changing dependencies)
        const stop = frameCount > 314;
        return stop;
    }
}
```

It is run once and the function you return from it is run on every animation cycle to paint a new frame to the canvas. Thanks to the magic of React hooks the factory is run again automatically if any of the dependencies change.

### Interactivity in `src/app/App.ts`
This is the place where the stateful logic lives (which you can pass as dependencies into the animation). If you want to change any of the controls or add event listeners this is the place to do it.

It's a React app, so you can do anything here you can do in React.
