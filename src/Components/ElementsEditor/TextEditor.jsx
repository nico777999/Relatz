import { useState, useEffect } from "react";

import TextDisplay from "../TextModifier/TextDisplay";

export default function TextEditor({ element, setElement }) {
  const [content, setContent] = useState(element.content);
  const [align, setAlign] = useState(element.align);
  const [fontFamily, setFontFamily] = useState(element.fontFamily);
  const [fontSize, setFontSize] = useState(element.fontSize);
  const [lineHeight, setLineHeight] = useState(element.lineHeight);
  const [indent, setIndent] = useState(element.indent);

  useEffect(() => {
    setFontSize(Math.max(6, fontSize));

    setLineHeight(Math.max(1, lineHeight));

    setIndent(Math.max(0, indent));

    const newElement = {
      type: "text",
      name: element.name,
      content: content,
      align: align,
      fontFamily: fontFamily,
      fontSize: Math.max(6, fontSize),
      lineHeight: lineHeight,
      indent: indent,
    };

    setElement(newElement);
  }, [content, align, fontFamily, fontSize, lineHeight, indent]);

  return (
    <div className="hidden group-hover:block py-2 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <TextDisplay 
          text={content}
          setText={setContent}
        />
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
          <option value="justify">Giustificato</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="fontFamily" className="w-full lg:w-[inherit]">
          Font family:
        </label>
        <select
          id="fontFamily"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        >
          <option value="Helvetica">Helvetica</option>
          <option value="Times-Roman">Times Roman</option>
          <option value="Courier">Courier</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="fontSize" className="w-full lg:w-[inherit]">
          Dimensione del font:
        </label>
        <input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="lineHeight" className="w-full lg:w-[inherit]">
          Altezza riga:
        </label>
        <input
          type="number"
          id="lineHeight"
          value={lineHeight}
          step={0.1}
          onChange={(e) => setLineHeight(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        />
      </div>
    </div>
  );
}
