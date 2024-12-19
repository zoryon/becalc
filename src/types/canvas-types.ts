export interface Response {
    expression: string,
    result: string,
    assign: boolean,
}

export interface GeneratedResult {
    expression: string,
    answer: string,
}

export interface ResetCanvasParams {
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
}

export interface StartDrawingParams {
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface StopDrawingParams {
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DrawParams {
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    isDrawing: boolean,
    color: string,
    isTouch?: boolean,
}

export interface RenderLatexToCanvasParams {
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    expression: string,
    answer: string,
    latexExpression: Array<string>,
    setLatexExpression: React.Dispatch<React.SetStateAction<Array<string>>>,
}
