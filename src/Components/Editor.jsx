import { useEffect, useState, useCallback } from "react";
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

  const [history, setHistory] = useState([[elements, null]]);
  const [displayedElements, setDisplayedElements] = useState(elements);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const goBack = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  useEffect(() => {
    const last = history[history.length - 1];
    setDisplayedElements(last[0]);
  }, [history]);

  // Funzione per ricostruire l'albero
  const getNode = useCallback(
    (parent, historyIndex) => {
      // Se siamo oltre la fine della history, restituisci il livello corrente
      if (historyIndex >= history.length) return parent;

      // Se siamo all'ultimo livello, restituisci direttamente gli elementi
      if (historyIndex === history.length - 1) {
        return history[historyIndex][0];
      }

      const updatedChildren = getNode(childElements, historyIndex + 1);

      const newParent = [...parent];
      newParent[parentIndex] = {
        ...newParent[parentIndex],
        elements: updatedChildren,
      };

      return newParent;
    },
    [history]
  );

  // Funzione per aggiornare un elemento
  const handleSetElement = useCallback(
    (updatedElement, index) => {
      const newDisplayed = [...displayedElements];
      newDisplayed[index] = updatedElement;

      const newHistory = [...history];
      newHistory[newHistory.length - 1][0] = newDisplayed;
      setHistory(newHistory);

      const newRoot = getNode(history[0][0], 1);
      setElements(newRoot);
    },
    [displayedElements, history, getNode, setElements]
  );

  // Funzione per navigare nei figli
  const handleSetDisplayedElements = useCallback(
    (childElements, childIndex) => {
      const newHistory = [...history];
      newHistory.push([childElements, childIndex]);
      setHistory(newHistory);
    },
    [history]
  );

  // Funzione per creare un nuovo elemento
  const addElement = useCallback((elementIndex) => {
    const newDisplayed = [...displayedElements];
    newDisplayed.push(elementsTypes[elementIndex][0]);

    const newHistory = [...history];
    newHistory[newHistory.length - 1][0] = newDisplayed;
    setHistory(newHistory);

    const newRoot = getNode(history[0][0], 1);
    setElements(newRoot);

    setIsPopupOpen(false);
  });

  return (
    <section className="relative">
      <div className="w-full h-96 py-4 px-1.5 border-x-2 border-[#ACACAC] overflow-y-scroll">
        {displayedElements.map((element, index) => (
          <DisplayElement
            key={index}
            element={element}
            setElement={(updated) => handleSetElement(updated, index)}
            setDisplayedElements={(newDisplayedElements) =>
              handleSetDisplayedElements(newDisplayedElements, index)
            }
          />
        ))}
      </div>

      {history.length > 1 && (
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
