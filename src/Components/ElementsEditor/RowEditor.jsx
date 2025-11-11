import { useState } from "react";

import getIcon from "../../icons";

export default function RowEditor({
  element,
  setElement,
  setDisplayedElements,
}) {
  const [justify, setJustify] = useState(element.justify);
  const [gap, setGap] = useState(element.gap);

  return (
    <>
      <div className="hidden group-hover:block py-2 px-4">
        <button
          onClick={() => setDisplayedElements()}
          className="w-full flex gap-2.5 py-1 px-4 border border-[#ACACAC] hover:bg-[#F3F3F3] rounded cursor-pointer"
        >
          {getIcon("enter")}
          <span>Elementi della riga</span>
        </button>
      </div>

      <div className="hidden group-hover:block py-2 px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
          <label htmlFor="gap" className="w-full lg:w-[inherit]">
            Spazio tra gli elementi:
          </label>
          <input
            type="number"
            id="gap"
            min={0}
            value={gap}
            onChange={(e) => setGap(e.target.value)}
            onBlur={() => {
              const updated = {
                ...element,
                gap: Math.max(0, gap),
              };
              setElement(updated);
            }}
            className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
          <label htmlFor="justify" className="w-full lg:w-[inherit]">
            Allineamento:
          </label>
          <select
            id="justify"
            className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
            value={justify}
            onChange={(e) => {
              const updated = {
                ...element,
                justify: e.target.value,
              };
              setElement(updated);
            }}
          >
            <option value="start">Sinistra</option>
            <option value="center">Centro</option>
            <option value="end">Destra</option>
            <option value="space-between">Distanziati</option>
          </select>
        </div>
      </div>
    </>
  );
}
