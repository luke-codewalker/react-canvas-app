import React, { useEffect, useRef } from 'react';

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // getContext can return null for unknown contexts but with '2d' we can be sure it will work, hence the !
        const context = canvas.getContext('2d')!;
        let i = 1;

        const draw = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): number => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 50 * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
            context.fill();
            i += 0.01;

            return requestAnimationFrame(() => draw(canvas, context))
        }

        const animationId = draw(canvas, context);

        return () => cancelAnimationFrame(animationId);
    })

    return <canvas ref={canvasRef}></canvas>
}