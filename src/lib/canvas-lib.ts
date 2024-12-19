import { DrawParams, RenderLatexToCanvasParams, ResetCanvasParams, StartDrawingParams, StopDrawingParams } from "@/types/canvas-types";

// reset canvas
export function resetCanvas({ canvasRef, }: ResetCanvasParams) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// drawing functions
export function startDrawing({
    e,
    canvasRef,
    setIsDrawing,
}: StartDrawingParams) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine coordinates based on event type
    const rect = canvas.getBoundingClientRect();
    const x =
        "touches" in e
            ? e.touches[0].clientX - rect.left
            : e.nativeEvent.offsetX;
    const y =
        "touches" in e
            ? e.touches[0].clientY - rect.top
            : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);

    setIsDrawing(true);
}

export function stopDrawing({ e, setIsDrawing, }: StopDrawingParams) {
    if (!e) return;

    setIsDrawing(false);
}

export function draw({ e, canvasRef, isDrawing, color, isTouch = false, }: DrawParams) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = isTouch
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - rect.left
        : (e as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left;
    const y = isTouch
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - rect.top
        : (e as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

export function renderLatexToCanvas({
    canvasRef,
    expression,
    answer,
    latexExpression,
    setLatexExpression,
}: RenderLatexToCanvasParams) {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
    setLatexExpression([...latexExpression, latex]);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


}