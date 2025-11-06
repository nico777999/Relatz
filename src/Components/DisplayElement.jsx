import getIcon from "../icons"

import TextEditor from "./ElementsEditor/TextEditor"
import ImagesContainerEditor from "./ElementsEditor/ImagesContainerEditor"
import LineEditor from "./ElementsEditor/LineEditor"
import TableEditor from "./ElementsEditor/TableEditor"
import ListEditor from "./ElementsEditor/ListEditor"
import SpaceEditor from "./ElementsEditor/SpaceEditor"

export default function DisplayElement({ element, setElement, setDisplayedElements }) {
    const types = {
      section: () => (<></>),
      row: () => (<></>),
      text: TextEditor,
      imagesContainer: ImagesContainerEditor,
      line: LineEditor,
      table: TableEditor,
      list: ListEditor,
      space: SpaceEditor,
    };

    return (
        <div className="group my-1 border-2 border-[#ACACAC] rounded">
            <header className="flex gap-2.5 py-2 px-4 hover:bg-[#F3F3F3]">
                <div className="cursor-grab" >
                    { getIcon("bars") }
                </div>
                <button>{element.type}</button>
            </header>
            {
                types[element.type]({ element, setElement })
            }
        </div>
    )
}