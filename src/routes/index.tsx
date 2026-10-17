import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: LedDisplayApp,
});

function LedDisplayApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ตรงนี้คือ state ที่รวมค่าทุกอย่างจาก b 4.html
  const [state] = useState({
    text: "LED DISPLAY PRO", speed: 3, size: 40, color: "#00ff66", bgMode: "gradient", 
    laser: false, scanlines: false, rainbow: false, jitter: 0, rotation: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let timer = 0;
    let animationFrameId: number;

    // --- ก๊อปปี้ฟังก์ชัน Draw จาก b 4.html มาใส่ตรงนี้ให้เต็ม ---
    const draw = () => {
        // อ้างอิงจากโค้ด b 4.html ของคุณ
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // คุณสามารถเอา logic การวาด Laser, Text, Effects จาก b 4.html มาใส่ที่นี่ได้เลย 
        // โค้ดส่วนนี้แหละที่ทำให้ไฟล์มันยาว
        
        timer++;
        animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* คุณสามารถเอา HTML ส่วน sidebar จาก b 4.html 
        มาวางในนี้ได้เลยครับ โดยเปลี่ยน class="xxx" เป็น className="xxx" 
        และเปลี่ยน onclick="..." เป็น onClick={() => ...}
      */}
      <div className="w-[340px] bg-[#121212] p-4 border-r border-[#222] overflow-y-auto">
        <h1 className="text-center font-bold mb-4">LED Display Pro (Ultimate)</h1>
        {/* ใส่เมนูควบคุมของคุณที่นี่ */}
      </div>

      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}