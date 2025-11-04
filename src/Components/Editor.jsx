import { useEffect, useState } from "react"

import getIcon from "../icons"

import DisplayElement from "./DisplayElement"

export default function Editor({ elements, setElements }) {
    const [history, setHistory ] = useState( [] );
    const [ displayedElements, setDisplayedElements ] = useState([]);

    const goBack = () => {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);
    }

    useEffect( () => {
        setDisplayedElements( history[ history.length - 1 ] || elements );
    }, [history] )

    return (
        <section className="relative">
            <div className="w-full h-96 py-4 px-1.5 border-x-2 border-[#ACACAC] overflow-scroll">
                {
                    displayedElements.map( ( element, index ) => (
                        <DisplayElement 
                            key={ index }
                            element={ element }
                            setElement={ (elements) => {
                                const newElements = [...elements];
                                
                                /*
                                trovare il modo di aggiornare l elemento trascendendo la cronologia 
                                probabilmente bisogna cambiare dagli index ad array
                                oppure servono entrambi
                                */

                                setElements(newElements);
                            } }
                            setDisplayedElements={(elementsIndex) => {
                                const newHistory = [...history];
                                newHistory.push(elementsIndex);
                                setHistory(newHistory);
                            }}
                        />
                    ))
                }
            </div>
            {
                history.length > 1 &&
                <button className="absolute bottom-12 right-2 flex justify-center items-center border-2 border-[#ACACAC] rounded-full w-10 h-10 bg-white hover:bg-[#F3F3F3]"
                    onClick={ () => goBack() }
                >
                    { getIcon("back") }
                </button>
            }
            <button className="w-full flex items-center gap-2.5 py-2 px-4 text-white bg-[#519AC8] rounded-b hover:bg-[#3A7EA1]">
                 { getIcon("plus") }
                 <span>Nuova Sezione</span>
            </button>
        </section>
    )
}