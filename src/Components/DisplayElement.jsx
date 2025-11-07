import { useState } from "react"

import getIcon from "../icons"

import TextEditor from "./ElementsEditor/TextEditor"
import ImagesContainerEditor from "./ElementsEditor/ImagesContainerEditor"
import LineEditor from "./ElementsEditor/LineEditor"
import TableEditor from "./ElementsEditor/TableEditor"
import ListEditor from "./ElementsEditor/ListEditor"
import SpaceEditor from "./ElementsEditor/SpaceEditor"

export default function DisplayElement({ element, setElement }) {
    const elementsTypes = {
      section: () => (<></>),
      row: () => (<></>),
      text: TextEditor,
      imagesContainer: ImagesContainerEditor,
      line: LineEditor,
      table: TableEditor,
      list: ListEditor,
      space: SpaceEditor,
    };

    const [isEditing, setIsEditing] = useState(false);
    
    return (
        <div className="group my-1 border-2 border-[#ACACAC] rounded">
            <header className="flex gap-2.5 py-2 px-4 hover:bg-[#F3F3F3]">
                <div className="cursor-grab" >
                    { getIcon(element.type) }
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={element.name}
                        onChange={(e) => setElement({ ...element, name: e.target.value })}
                        onBlur={() => setIsEditing(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                        autoFocus
                    />
                ) : (
                    <button
                        onDoubleClick={() => setIsEditing(true)}
                    >{element.name}</button>
                )}
            </header>
            {
                elementsTypes[element.type]({ element, setElement })
            }
        </div>
    )
}