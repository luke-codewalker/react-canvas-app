import { RefObject, useEffect, useRef } from 'react';

export type AnimationSetup<T> = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, customArguments: T) => AnimationFrame;
export type AnimationFrame = (frameCount: number) => void;

export const useCanvas = <T extends unknown[]>(drawFrameFactory: AnimationSetup<T>, customArguments: T): RefObject<HTMLCanvasElement> => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // getContext can return null for unknown contexts but with '2d' we can be sure it will work, hence the !
        const context = canvas.getContext('2d')!;
        let frameCount = 0;
        const drawFrame = drawFrameFactory(canvas, context, customArguments);

        const render = (): number => {
            drawFrame(frameCount);
            frameCount++;
            return requestAnimationFrame(render)
        }

        const animationId = render();

        return () => cancelAnimationFrame(animationId);
        // we need to use spread to dynamically pass the dependencies which works in the runtime, 
        // but the compiler does not like it because it can't be statically checked
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawFrameFactory, ...customArguments])

    return canvasRef;
}
