import { useEffect, useState } from "react";
import getIcon from "../icons";
import DisplayElement from "./DisplayElement";

export default function Editor({ elements, setElements }) {
  const elementsTypes = [
    [
      {
        type: "section",
        name: "Sezione",
        elements: [],
        margin: { top: 0, bottom: 5, left: 0, right: 0 },
      },
      "Contenitore per un sottoinsieme di elementi",
    ],
    [
      {
        type: "row",
        name: "Riga",
        justify: "start",
        gap: 10,
        elements: [],
      },
      "Contenitore per disporre elementi su una stessa riga",
    ],
    [
      {
        type: "text",
        name: "Testo",
        content: "",
        align: "left",
        fontFamily: "Helvetica",
        fontSize: 14,
        lineHeight: 1.4,
        indent: 0,
      },
      "Blocco di testo",
    ],
    [
      {
        type: "imagesContainer",
        name: "Contenitore di immagini",
        height: 200,
        align: "center",
        layout: "row",
        gap: 10,
        images: [],
      },
      "Contenitore per una o più immagini",
    ],
    [
      {
        type: "line",
        name: "Linea",
        color: "#000000",
        thickness: 1,
        width: 100,
        align: "center",
        style: "solid",
        margin: { top: 5, bottom: 5 },
      },
      "Linea separatrice personalizzabile",
    ],
    [
      {
        type: "table",
        name: "Tabella",
        dimensions: { rows: 2, columns: 2 },
        cellSize: { width: 100, height: 40 },
        borders: { show: true, color: "#000000", width: 1 },
        rows: [
          [
            { content: "", bgColor: "#FFFFFF" },
            { content: "", bgColor: "#FFFFFF" },
          ],
          [
            { content: "", bgColor: "#FFFFFF" },
            { content: "", bgColor: "#FFFFFF" },
          ],
        ],
      },
      "Tabella con righe e colonne configurabili",
    ],
    [
      {
        type: "list",
        name: "Lista",
        ordered: false,
        simbol: "-",
        elements: ["Voce 1", "Voce 2"],
      },
      "Lista ordinata o non ordinata",
    ],
    [
      {
        type: "space",
        name: "Spazio",
        size: 20,
      },
      "Gap verticale",
    ],
  ];

  const [history, setHistory] = useState([]);
  const [displayedElements, setDisplayedElements] = useState(elements);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const goBack = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  useEffect(() => {
    if (history.length == 0) {
      setDisplayedElements(elements);
      return;
    }

    let newDisplayedElements = [...elements];
    for (var i = 0; i < history.length; i++) {
      newDisplayedElements = newDisplayedElements[history[i]].elements;
    }

    setDisplayedElements(newDisplayedElements);
  }, [history]);

  const handleSetDisplayedElements = (index) => {
    const newHistory = [...history];
    newHistory.push(index);
    setHistory(newHistory);
  };

  const getNewRoot = (newElements, treePos = 0) => {
    if (history.length === 0) return newElements;

    const recurse = (current, pos) => {
      const cloned = Array.isArray(current) ? [...current] : [];
      const idx = history[pos];

      if (pos === history.length - 1) {
        const parent = cloned[idx] ? { ...cloned[idx] } : { elements: [] };
        parent.elements = newElements;
        cloned[idx] = parent;
        return cloned;
      } else {
        const parent = cloned[idx] ? { ...cloned[idx] } : { elements: [] };
        parent.elements = recurse(parent.elements || [], pos + 1);
        cloned[idx] = parent;
        return cloned;
      }
    };

    return recurse(elements, treePos);
  };

  const handleSetElement = (updatedElement, index) => {
    const newDisplayed = [...displayedElements];
    newDisplayed[index] = updatedElement;
    const newRoot = getNewRoot(newDisplayed);
    setElements(newRoot);
    setDisplayedElements(newDisplayed);
  };

  const addElement = (typeIndex) => {
    const template = elementsTypes[typeIndex][0];
    const newElement = JSON.parse(JSON.stringify(template));
    const newElements = [...displayedElements, newElement];
    const newRoot = getNewRoot(newElements);
    setElements(newRoot);
    setDisplayedElements(newElements);
    setIsPopupOpen(false);
  };

  const deleteElement = (index) => {
    const newElements = displayedElements.filter(
      (_, currentIndex) => currentIndex != index
    );
    const newRoot = getNewRoot(newElements);
    setElements(newRoot);
    setDisplayedElements(newElements);
  };

  const moveElement = (move, index) => {
    if( (index == displayedElements.length - 1 && move == 1) || (index == 0 && move == -1) ){
      return;
    }

    const newElements = [...displayedElements];
    const temp = newElements[index];
    newElements[index] = newElements[index + move];
    newElements[index + move] = temp;
    const newRoot = getNewRoot(newElements);
    setElements(newRoot);
    setDisplayedElements(newElements);
  };

  return (
    <section className="relative">
      <div className="w-full h-96 py-4 px-1.5 border-x-2 border-[#ACACAC] overflow-y-scroll">
        {displayedElements.map((element, index) => (
          <DisplayElement
            key={index}
            element={element}
            setElement={(updated) => handleSetElement(updated, index)}
            setDisplayedElements={() => handleSetDisplayedElements(index)}
            deleteElement={() => deleteElement(index)}
            moveElement={(move) => moveElement(move, index)}
          />
        ))}
      </div>

      {history.length > 0 && (
        <button
          className="absolute bottom-12 right-2 flex justify-center items-center border-2 border-[#ACACAC] rounded-full w-10 h-10 bg-white hover:bg-[#F3F3F3]"
          onClick={goBack}
        >
          {getIcon("back")}
        </button>
      )}

      <button
        onClick={() => setIsPopupOpen(true)}
        className="w-full flex items-center gap-2.5 py-2 px-4 text-white bg-[#519AC8] rounded-b hover:bg-[#3A7EA1]"
      >
        {getIcon("plus")}
        <span>Aggiungi Elemento</span>
      </button>

      {isPopupOpen && (
        <div className="absolute inset-0 bg-[#00000080] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Aggiungi nuovo elemento</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                {getIcon("x")}
              </button>
            </div>
            <div className="max-h-56 flex flex-col gap-4 overflow-y-auto">
              {elementsTypes.map(([element, description], index) => (
                <div
                  key={index}
                  onClick={() => addElement(index)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {element.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
