import { Animation } from "../lib/canvas";

export const draw: Animation<[number, number]> = (canvas, context, [frequency, width]) => {
    // this code is run before the animation whenever the external dependencies change
    let iteration = 0;
    const step = 0.05 * frequency / 100;
    const maxRadius = canvas.width * width / 100 / 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    context.lineWidth = 4;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "12px Arial";
    // this function is called to paint each frame of the animation
    return frameCount => {
        context.clearRect(12, 12, 80, 12);

        context.fillStyle = '#333';
        context.fillText(`Frame ${frameCount}`, 12, 24);

        context.strokeStyle = '#0060df';
        context.fillStyle = 'rgba(255, 255, 255, 0.125)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, maxRadius * Math.abs(Math.cos(iteration)), 0, 2 * Math.PI);
        context.stroke();
        iteration += step;
    }
}