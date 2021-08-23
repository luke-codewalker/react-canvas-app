import React, { useEffect, useRef } from 'react';

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // getContext can return null for unknown contexts but with '2d' we can be sure it will work, hence the !
        const context = canvas.getContext('2d')!;

        context.beginPath();
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();
    })

    return <canvas ref={canvasRef}></canvas>
}