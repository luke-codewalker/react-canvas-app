import React, { CanvasHTMLAttributes, useEffect, useRef, useState } from 'react';

export const Canvas = (props: CanvasHTMLAttributes<HTMLCanvasElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [frequency, setFrequency] = useState(5);
    const [width, setWidth] = useState(80);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // getContext can return null for unknown contexts but with '2d' we can be sure it will work, hence the !
        const context = canvas.getContext('2d')!;
        let i = 1;
        const iIncrement = frequency / 200;
        const maxRadius = canvas.width * width / 100 / 2;
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        const draw = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): number => {
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, maxRadius * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
            context.fillStyle = 'tomato';
            context.fill();
            i += iIncrement;

            return requestAnimationFrame(() => draw(canvas, context))
        }

        const animationId = draw(canvas, context);

        return () => cancelAnimationFrame(animationId);
    }, [frequency, width])

    return <div>
        <label>Frequency
        <input type="range" name="frequency" id="frequency" min="1" max="10" value={frequency} onChange={event => setFrequency(parseInt(event.target.value))} />
        </label>
        <label>Max Width
        <input type="range" name="width" id="width" min="1" max="100" value={width} onChange={event => setWidth(parseInt(event.target.value))} />
        </label>
        <canvas ref={canvasRef} {...props}></canvas>
    </div >
}