import { useState, useEffect } from "react";
export default function LineEditor({ element, setElement }) {
  
  const [thickness, setThickness] = useState(element.thickness);
  const [width, setWidth] = useState(element.width);
  const [align, setAlign] = useState(element.align);
  const [style, setStyle] = useState(element.style);
  const [color, setColor] = useState(element.color);

  useEffect(() => {
    const newElement = {
      type: "line",
      name: element.name,
      color: color,
      thickness: thickness,
      width: Math.max(Math.min(100, width), 0), // per evitare numeri negati o maggiori di 100
      align: align,
      style: style,
      margin: { top: 5, bottom: 5 },
    };

    setElement(newElement);
  }, [thickness, width, align, style, color]);

  return (
    <div className="hidden group-hover:block py-2 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="thickness" className="w-full lg:w-[inherit]">
          Imposta altezza:
        </label>
        <input
          type="number"
          id="thickness"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="width" className="w-full lg:w-[inherit]">
          Imposta lunghezza: (in %)
        </label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          min={0}
          max={100}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="align" className="w-full lg:w-[inherit]">
          Allineamento:
        </label>
        <select
          id="align"
          value={align}
          onChange={(e) => setAlign(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        >
          <option value="left">Sinistra</option>
          <option value="center">Centro</option>
          <option value="right">Destra</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="style" className="w-full lg:w-[inherit]">
          Stile linea:
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        >
          <option value="solid">Solida</option>
          <option value="dashed">Tratteggiata</option>
          <option value="dotted">Punteggiata</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="color" className="w-full lg:w-[inherit]">
          Colore:
        </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 h-8"
        />
      </div>
    </div>
  );
}
