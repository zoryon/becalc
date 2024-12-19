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
    canvasRef,
    isDrawing,
    color,
}: {
    e: React.MouseEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    isDrawing: boolean,
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

export function renderLatexToCanvas({
    canvasRef,
    expression,
    answer,
    latexExpression,
    setLatexExpression,
}: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    expression: string,
    answer: string,
    latexExpression: Array<string>,
    setLatexExpression: React.Dispatch<React.SetStateAction<Array<string>>>,
}) {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
    setLatexExpression([...latexExpression, latex]);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


}