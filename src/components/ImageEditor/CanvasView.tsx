"use client";

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fabric } from "fabric";
import { useEditorStore } from "@/store/editorStore";

export const CanvasView = forwardRef((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const { 
    imageSrc, isDrawingMode, brushColor, brushWidth,
    brightness, contrast, saturate, sepia, hue, blur, temperature, vignette, exposure,
    saveToHistory
  } = useEditorStore();

  const [isLoading, setIsLoading] = useState(false);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    getCanvas: () => fabricCanvas.current,
    addText: () => {
      if (!fabricCanvas.current) return;
      const text = new fabric.IText("Escribe aquí...", {
        left: 100,
        top: 100,
        fontFamily: "Inter",
        fontSize: 40,
        fill: "#ffffff",
        fontWeight: "900",
      });
      fabricCanvas.current.add(text).setActiveObject(text);
      saveToHistory();
    },
    addShape: (type: string) => {
      if (!fabricCanvas.current) return;
      let shape;
      const common = { left: 100, top: 100, fill: "transparent", stroke: brushColor, strokeWidth: brushWidth };
      
      if (type === 'rect') shape = new fabric.Rect({ ...common, width: 100, height: 100 });
      else if (type === 'circle') shape = new fabric.Circle({ ...common, radius: 50 });
      else if (type === 'arrow') {
        // Simple line as placeholder for arrow
        shape = new fabric.Line([50, 50, 150, 150], { ...common, strokeWidth: brushWidth });
      }

      if (shape) {
        fabricCanvas.current.add(shape).setActiveObject(shape);
        saveToHistory();
      }
    },
    applyFilter: (filterName: string) => {
      if (!fabricCanvas.current) return;
      const img = fabricCanvas.current.getObjects("image")[0] as fabric.Image;
      if (!img) return;

      img.filters = []; // Clear current filters for preset apply
      
      switch(filterName) {
        case 'B&N': img.filters.push(new fabric.Image.filters.Grayscale()); break;
        case 'Sepia': img.filters.push(new fabric.Image.filters.Sepia()); break;
        case 'Vintage': img.filters.push(new fabric.Image.filters.Vintage()); break;
        case 'HDR': img.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.5 })); break;
      }

      img.applyFilters();
      fabricCanvas.current.renderAll();
      saveToHistory();
    }
  }));

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "transparent",
      preserveObjectStacking: true,
    });

    return () => {
      fabricCanvas.current?.dispose();
    };
  }, []);

  // Handle Resize & Responsive
  useEffect(() => {
    const handleResize = () => {
      if (!fabricCanvas.current || !containerRef.current) return;
      const container = containerRef.current;
      const scale = Math.min(container.clientWidth / 800, container.clientHeight / 600);
      fabricCanvas.current.setZoom(scale);
      fabricCanvas.current.setWidth(800 * scale);
      fabricCanvas.current.setHeight(600 * scale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load Image
  useEffect(() => {
    if (!imageSrc || !fabricCanvas.current) return;
    
    setIsLoading(true);
    fabric.Image.fromURL(imageSrc, (img) => {
      if (!fabricCanvas.current) return;
      fabricCanvas.current.clear();
      
      // Scale image to fit canvas
      const scale = Math.min(800 / (img.width || 800), 600 / (img.height || 600));
      img.scale(scale);
      img.set({
        left: 400,
        top: 300,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
      });

      fabricCanvas.current.add(img);
      fabricCanvas.current.sendToBack(img);
      fabricCanvas.current.renderAll();
      setIsLoading(false);
    }, { crossOrigin: "anonymous" });
  }, [imageSrc]);

  // Handle Drawing Mode
  useEffect(() => {
    if (!fabricCanvas.current) return;
    fabricCanvas.current.isDrawingMode = isDrawingMode;
    if (isDrawingMode) {
      fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
      fabricCanvas.current.freeDrawingBrush.color = brushColor;
      fabricCanvas.current.freeDrawingBrush.width = brushWidth;
    }
  }, [isDrawingMode, brushColor, brushWidth]);

  // Apply Adjustments (Filters)
  useEffect(() => {
    if (!fabricCanvas.current) return;
    const img = fabricCanvas.current.getObjects("image")[0] as fabric.Image;
    if (!img) return;

    const filters = [];
    if (brightness !== 100) filters.push(new fabric.Image.filters.Brightness({ brightness: (brightness - 100) / 100 }));
    if (contrast !== 100) filters.push(new fabric.Image.filters.Contrast({ contrast: (contrast - 100) / 100 }));
    if (saturate !== 100) filters.push(new fabric.Image.filters.Saturation({ saturation: (saturate - 100) / 100 }));
    if (blur > 0) filters.push(new fabric.Image.filters.Blur({ blur: blur / 100 }));

    img.filters = filters;
    img.applyFilters();
    fabricCanvas.current.renderAll();
  }, [brightness, contrast, saturate, blur]);

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center relative p-4 lg:p-12 min-h-0 w-full h-full overflow-hidden">
      <div className="relative shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden bg-[#111]">
        <canvas ref={canvasRef} />
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    </div>
  );
});

CanvasView.displayName = "CanvasView";
