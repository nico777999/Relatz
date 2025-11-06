import { useEffect, useState } from "react";
import getIcon from "../icons";
import DisplayElement from "./DisplayElement";

export default function Editor({ elements, setElements }) {
    const [history, setHistory] = useState([[elements, null]]);
    const [displayedElements, setDisplayedElements] = useState(elements);

    // Torna indietro
    const goBack = () => {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);
    };

    // Quando cambia la history, aggiorna gli elementi mostrati
    useEffect(() => {
        const last = history[history.length - 1];
        setDisplayedElements(last[0]);
    }, [history]);

    return (
        <section className="relative">
            <div className="w-full h-96 py-4 px-1.5 border-x-2 border-[#ACACAC] overflow-scroll">
                {displayedElements.map((element, index) => (
                    <DisplayElement
                        key={index}
                        element={element}
                        setElement={(updatedElement) => {
                            // copia lo stato attuale
                            const newDisplayed = [...displayedElements];
                            newDisplayed[index] = updatedElement;

                            // aggiorna la history con il nuovo livello
                            const newHistory = [...history];
                            newHistory[newHistory.length - 1][0] = newDisplayed;
                            setHistory(newHistory);

                            // ricostruisce la root partendo dalla history
                            let newRoot = [...history[0][0]];
                            for (let i = 1; i < history.length; i++) {
                                const [childElements, parentIndex] = history[i];
                                newRoot[parentIndex].elements = childElements;
                            }

                            setElements(newRoot);
                        }}
                        setDisplayedElements={(childElements, childIndex) => {
                            // aggiungi un nuovo livello di history
                            const newHistory = [...history];
                            newHistory.push([childElements, childIndex]);
                            setHistory(newHistory);
                        }}
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

            <button className="w-full flex items-center gap-2.5 py-2 px-4 text-white bg-[#519AC8] rounded-b hover:bg-[#3A7EA1]">
                {getIcon("plus")}
                <span>Nuova Sezione</span>
            </button>
        </section>
    );
}