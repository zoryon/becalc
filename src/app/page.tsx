"use client";

import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "@/constants/colors";
import { draw, resetCanvas, startDrawing, stopDrawing } from "@/lib/canvas-lib";
// import { GeneratedResult } from "@/types/canvas-types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Swatch from "@/components/Swatch";
import { GeneratedResult } from "@/types/canvas-types";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>(SWATCHES[0]);
  const [reset, setReset] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedResult>();
  const [dictOfVars, setDictOfVars] = useState({});

  useEffect(() => {
    if (!reset) return;

    resetCanvas({ canvasRef });
    setResult(undefined);
    setDictOfVars({});
    setReset(false);
  }, [reset]);

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

    console.log("Response: ", data);
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
        onMouseMove={(e) => draw({ e, isDrawing, canvasRef, color })}
      />
    </>
  );
}
