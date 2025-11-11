import { useState, useEffect } from "react";

export default function SpaceEditor({ element, setElement }) {
  const [size, setSize] = useState(element.size);

  useEffect(() => {
    const newElement = {
      type: "space",
      name: element.name,
      size: Math.max(0, size),
    };
    setElement(newElement);
  }, [size]);

  return (
    <div className="hidden group-hover:block py-2 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2.5 mb-1">
        <label htmlFor="size" className="w-full lg:w-[inherit]">
          Altezza:
        </label>
        <input
          type="number"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full lg:w-[inherit] lg:min-w-1/2 px-3 py-1 border border-[#ACACAC] rounded"
        />
      </div>
    </div>
  );
}
