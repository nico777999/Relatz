import { useState } from "react";

import getIcon from "../icons";

import SectionEditor from "./ElementsEditor/SectionEditor";
import RowEditor from "./ElementsEditor/RowEditor";
import TextEditor from "./ElementsEditor/TextEditor";
import ImagesContainerEditor from "./ElementsEditor/ImagesContainerEditor";
import LineEditor from "./ElementsEditor/LineEditor";
import TableEditor from "./ElementsEditor/TableEditor";
import ListEditor from "./ElementsEditor/ListEditor";
import SpaceEditor from "./ElementsEditor/SpaceEditor";

export default function DisplayElement({
  element,
  setElement,
  setDisplayedElements,
  deleteElement,
  moveElement
}) {
  const elementsTypes = {
    section: ({ element, setElement }) =>
      SectionEditor({ element, setElement, setDisplayedElements }),
    row: ({ element, setElement }) =>
      RowEditor({ element, setElement, setDisplayedElements }),
    text: TextEditor,
    imagesContainer: ImagesContainerEditor,
    line: LineEditor,
    table: TableEditor,
    list: ListEditor,
    space: SpaceEditor,
  };

  const EditorComponent = elementsTypes[element.type];

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group my-1 border-2 border-[#ACACAC] rounded">
      <header className="relative flex gap-2.5 py-2 px-4 group-hover:bg-[#F3F3F3]">
        <div>{getIcon(element.type)}</div>
        {isEditing ? (
          <input
            type="text"
            value={element.name}
            onChange={(e) => setElement({ ...element, name: e.target.value })}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
          />
        ) : (
          <button onDoubleClick={() => setIsEditing(true)} className="min-w-50 text-left">
            {element.name}
          </button>
        )}
        <div className="hidden h-full group-hover:flex absolute top-0 right-2 items-center gap-2">
          <div className="flex items-center">
            <button
              onClick={() => moveElement(-1)}
              className="py-0.5 px-1 text-[#333333] border border-[#F3F3F3] hover:border-[#ACACAC] rounded cursor-pointer"
            >
              {getIcon("arrowUp")}
            </button>
            <button
              onClick={() => moveElement(1)}
              className="py-0.5 px-1 text-[#333333] border border-[#F3F3F3] hover:border-[#ACACAC] rounded cursor-pointer"
            >
              {getIcon("arrowDown")}
            </button>
          </div>
          <button
            onClick={() => deleteElement()}
            className="py-0.5 px-1 text-[#ff3d3d] hover:bg-[#ffdfdf] rounded cursor-pointer"
          >
            {getIcon("trash")}
          </button>
        </div>
      </header>
      <EditorComponent
        element={element}
        setElement={setElement}
        setDisplayedElements={setDisplayedElements}
        />
    </div>
  );
}
