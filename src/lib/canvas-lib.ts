// reset canvas
export function resetCanvas({
    canvasRef,
}: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
}) {
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
}: {
    e: React.MouseEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
}

export function stopDrawing({
    e,
    setIsDrawing,
}: {
    e: React.MouseEvent<HTMLCanvasElement>,
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    if (!e) return;

    setIsDrawing(false);
}

export function draw({
    e,
    isDrawing,
    canvasRef,
    color,
}: {
    e: React.MouseEvent<HTMLCanvasElement>,
    isDrawing: boolean,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    color: string,
}) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
}