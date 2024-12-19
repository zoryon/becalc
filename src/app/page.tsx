"use client";

import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "@/constants/colors";
import { draw, renderLatexToCanvas, resetCanvas, startDrawing, stopDrawing } from "@/lib/canvas-lib";
import { GeneratedResult, Response } from "@/types/canvas-types";
import { Button } from "@/components/ui/button";
import Swatch from "@/components/Swatch";
import axios from "axios";
import Draggable from "@/components/Draggable";
import { MathJax } from "better-react-mathjax";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>(SWATCHES[0]);
  const [reset, setReset] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedResult>();
  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [latexPosition, setLatexPosition] = useState<{ x: number, y: number }>({ x: 10, y: 200 });
  const [dictOfVars, setDictOfVars] = useState({});

  useEffect(() => {
    if (!reset) return;

    resetCanvas({ canvasRef });
    setLatexExpression([]);
    setResult(undefined);
    setDictOfVars({});
    setReset(false);
  }, [reset]);

  useEffect(() => {
    if (latexExpression.length <= 0 || !MathJax) return;
    // placeholder for any necessary updates when the latexExpression changes
  }, [latexExpression]);

  useEffect(() =>{
    if (!result) return;

    renderLatexToCanvas({
      canvasRef,
      expression: result.expression, 
      answer: result.answer, 
      latexExpression,
      setLatexExpression
    });
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvas.offsetTop;
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
  }, []);

  async function sendData() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { data } = await axios({
      method: "post",
      url: "/api/calculate",
      data: {
        image: canvas.toDataURL("image/png"),
        dict_of_vars: dictOfVars,
      },
    });

    console.log(data);

    data.data.forEach((res: Response) => {
      if (!res.assign) return;

      setDictOfVars({
        ...dictOfVars,
        [res.expression]: res.result,
      });
    });

    const ctx = canvas.getContext("2d");
    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    let minX = canvas.width, 
        minY = canvas.height,
        maxX = 0,
        maxY = 0;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        if (imageData.data[(y * canvas.width + x) * 4 + 3] <= 0) continue;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    const centerX = minX + maxX / 2;
    const centerY = minY + maxY / 2;

    setLatexPosition({ x: centerX, y: centerY });

    data.data.forEach((res: Response) => {
      setTimeout(() => {
        setResult({
          expression: res.expression,
          answer: res.result,
        });
      });
    }, 200);
  } 

  return (
    <>
      {/* functionalities */}
      <div className="grid grid-cols-3 gap-2">
        {/* reset button */}
        <Button
          className="z-20 bg-black text-white"
          variant={"secondary"}
          onClick={() => setReset(true)}
        >
          Reset
        </Button>

        {/* color swatches */}
        <div className="flex justify-evenly items-center gap-2">
          {SWATCHES.map((swatch: string) => {
            return (
              <Swatch
                key={swatch}
                color={swatch}
                isSelected={color === swatch}
                onClick={() => setColor(swatch)}
              />
            );
          })}
        </div>

        {/* calculate button */}
        <Button
          className="z-20 bg-black text-white"
          variant={"secondary"}
          onClick={() => sendData()}
        >
          Calculate
        </Button>
      </div>

      {/* canvas */}
      <canvas
        ref={canvasRef} width={800} height={600}
        id="canvas"
        className="w-screen h-screen absolute left-0 top-0"
        onMouseDown={(e) => startDrawing({ e, canvasRef, setIsDrawing })}
        onMouseOut={(e) => stopDrawing({ e, setIsDrawing })}
        onMouseUp={(e) => stopDrawing({ e, setIsDrawing })}
        onMouseMove={(e) => draw({ e, canvasRef, isDrawing, color })}
        onTouchStart={(e) => startDrawing({ e, canvasRef, setIsDrawing})}
        onTouchEnd={(e) => stopDrawing({ e, setIsDrawing })}
        onTouchMove={(e) => draw({ e, canvasRef, isDrawing, color, isTouch: true })}
      />

      {/* latex expression */}
      {latexExpression && latexExpression.map((latex, i) => {
        return (
          <Draggable 
            key={i}
            defaultPosition={latexPosition}
            onStop={(e, data) => {
              console.log(e);
              setLatexPosition({ x: data.x, y: data.y })
            }}
          >
            <div className="absolute text-foreground">
              <MathJax>
                {latex}
              </MathJax>
            </div>
          </Draggable>
        );
      })}
    </>
  );
}
