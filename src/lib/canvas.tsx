import { RefObject, useEffect, useRef } from 'react';

export type Animation<ExternalDependencies> = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, externalDependencies: ExternalDependencies) => AnimationFrame;
export type AnimationFrame = (frameCount: number) => void;

export const useCanvas = <ExternalDependencies extends unknown[]>(drawFrameFactory: Animation<ExternalDependencies>, externalDependencies: ExternalDependencies): RefObject<HTMLCanvasElement> => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number>(0);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // getContext can return null for unknown contexts but with '2d' we can be sure it will work, hence the !
        const context = canvas.getContext('2d')!;
        let frameCount = 0;
        const drawFrame = drawFrameFactory(canvas, context, externalDependencies);

        const render = (): void => {
            drawFrame(frameCount);
            frameCount++;
            animationIdRef.current = window.requestAnimationFrame(render)
        }

        render();

        return () => window.cancelAnimationFrame(animationIdRef.current);
        // we need to use spread to dynamically pass the dependencies which works in the runtime, 
        // but the compiler does not like it because it can't be statically checked
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawFrameFactory, ...externalDependencies])

    return canvasRef;
}
