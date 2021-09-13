import { Animation } from "../lib/canvas";
const size = 20;

export const draw: Animation<[number]> = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, [stepSize]) => {
    // this code is run before the animation whenever the external dependencies change
    let x = 0;
    const y = canvas.height / 2;
    context.fillStyle = '#333';
    let pausePassed = false;

    // this function is called to paint each frame of the animation
    return ({ frameCount, stopAnimating, startAnimating, restartAnimating }) => {
        // this is a closure so we can access anything from setup
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(x, y, size, size);
        x = (x + stepSize) % canvas.width;

        // you can stop the animation anytime by returning true (it can only be restarted by changing dependencies)
        if (frameCount > 314 && !pausePassed) {
            pausePassed = true;
            stopAnimating();
            setTimeout(startAnimating, 1000)
        };

        if (frameCount === canvas.width) {
            restartAnimating();
        }
    }
}