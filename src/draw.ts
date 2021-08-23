import { Animation } from "./lib/canvas";

export const draw: Animation<[number, number]> = (canvas, context, [frequency, width]) => {
    // this code is run before the animation whenever the external dependencies change
    let iteration = 0;
    const step = frequency / 200;
    const maxRadius = canvas.width * width / 100 / 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // this function is called to paint each frame of the animation
    return frameCount => {
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, maxRadius * Math.abs(Math.cos(iteration)), 0, 2 * Math.PI);
        context.fillStyle = 'tomato';
        context.fill();
        iteration += step;
    }
}