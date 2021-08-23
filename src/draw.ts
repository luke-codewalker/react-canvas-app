import { AnimationSetup } from "./lib/canvas";

export const draw: AnimationSetup<[number, number]> = (canvas, context, [frequency, width]) => {
    const iIncrement = frequency / 200;
    const maxRadius = canvas.width * width / 100 / 2;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    let i = 0;

    return frameCount => {
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, maxRadius * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
        context.fillStyle = 'tomato';
        context.fill();
        i += iIncrement;
    }
}