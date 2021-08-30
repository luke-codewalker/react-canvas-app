import { Animation } from "./lib/canvas";

export const draw: Animation<[number, number]> = (canvas, context, [frequency, width]) => {
    console.log('creating new animation')
    // this code is run before the animation whenever the external dependencies change
    let iteration = 0;
    const step = 0.05 * frequency / 100;
    const maxRadius = canvas.width * width / 100 / 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    context.strokeStyle = '#0060df';
    context.lineWidth = 4;
    context.fillStyle = 'rgba(255, 255, 255, 0.125)';
    context.clearRect(0, 0, canvas.width, canvas.height);

    // this function is called to paint each frame of the animation
    return frameCount => {
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, maxRadius * Math.abs(Math.cos(iteration)), 0, 2 * Math.PI);
        context.stroke();
        iteration += step;
    }
}