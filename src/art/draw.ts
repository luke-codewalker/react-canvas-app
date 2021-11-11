import { Animation } from "../lib/canvas";
const size = 20;

export const draw: Animation<[number]> = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, [stepSize]) => {
    // this code is run before the animation whenever the external dependencies change or the animation is reset
    let x = 0;
    const y = canvas.height / 2;
    context.fillStyle = '#333';

    // this function is called to paint each frame of the animation
    return ({ frameCount, stopAnimation, startAnimation, resetAnimation }) => {
        // this is a closure so we can access anything from setup
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(x, y, size, size);
        x = (x + stepSize) % canvas.width;

        if (frameCount === 314) {
            // you can stop an (re)start the animation any time you like
            stopAnimation();
            setTimeout(startAnimation, 1000)
        };

        if (frameCount === canvas.width) {
            // if you want to start over use resetAnimation(), this will call your draw function again
            // and start a new animation loop
            resetAnimation();
        }
    }
}