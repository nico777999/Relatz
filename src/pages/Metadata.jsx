import { useState } from "react"

import importRelatz from "../database/importRelatz"

import getIcon from "../icons"

export default function Metadata( { relatz, setRelatz } ) {
    const [ title, setTitle ] = useState( relatz.metadata.title === "" ? "Senza Titolo" : relatz.metadata.title )
    const [ subject, setSubject ] = useState( relatz.metadata.subject === "" ? "Senza Sottotitolo" : relatz.metadata.subject )

    const [ author, setAuthor ] = useState( relatz.metadata.author === "" ? "Sconosciuto" : relatz.metadata.author )

    const [ keywords, setKeywords ] = useState( relatz.metadata.keywords )
    const [ newKeyword, setNewKeyword ] = useState("");

    const addKeyword = () => {
        let keyword = newKeyword;
        keyword.trim();
        if ( keyword.length === 0 ) {
            alert("La parola chiave non può essere vuota.");
            return;
        };
        if ( keywords.includes( keyword ) ) {
            alert("La parola chiave è già stata aggiunta.");
            return;
        };

        const newKeywords = [ ...keywords, keyword ];
        setKeywords( newKeywords );

        setNewKeyword("");
    }

    const removeKeyword = ( index ) => {
        const newKeywords = keywords.filter( ( _, i ) => i !== index );
        setKeywords( newKeywords );
    }

    const saveMetadata = () => {
        const newRelatz = { ...relatz };
        newRelatz.metadata.title = title;
        newRelatz.metadata.subject = subject;
        newRelatz.metadata.author = author;
        newRelatz.metadata.keywords = keywords;

        setRelatz( newRelatz );
        importRelatz( newRelatz );
    }

    return (
        <section>
            <h2 className="py-5 text-3xl">Imposta i metadata del documento:</h2>
            <form>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 flex flex-col lg:border-r border-[#ACACAC] lg:pr-2.5">
                        <label className="pb-1.5 font-medium" htmlFor="title">Titolo:</label>
                        <input
                            id="title"
                            type="text"
                            value={ title }
                            onChange={ ( e ) => setTitle( e.target.value ) }
                            className="w-full py-1 px-2 mb-3 border border-[#ACACAC] rounded"
                        />
                        <label className="pb-1.5 font-medium" htmlFor="subject">Sottotitolo:</label>
                        <input
                            id="subject"
                            type="text"
                            value={ subject }
                            onChange={ ( e ) => setSubject( e.target.value ) }
                            className="w-full py-1 px-2 mb-3 border border-[#ACACAC] rounded"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col lg:border-l border-[#ACACAC] lg:pl-2.5">
                        <label className="pb-1.5 font-medium" htmlFor="author">Autore:</label>
                        <input
                            id="author"
                            type="text"
                            value={ author }
                            onChange={ ( e ) => setAuthor( e.target.value ) }
                            className="w-full py-1 px-2 border border-[#ACACAC] rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-3">
                    <label className="pt-3.5 pb-1.5 font-medium" htmlFor="keywords">Parole chiave:</label>
                    <div className="flex gap-2.5">
                        <input 
                            id="keywords"
                            type="text"
                            className="grow py-1 px-2 border border-[#ACACAC] rounded"
                            value={ newKeyword }
                            onChange={ ( e ) => setNewKeyword( e.target.value ) }
                        />
                        <button type="button" className="flex items-center gap-2.5 py-2 px-4 text-white bg-[#519AC8] rounded hover:bg-[#3A7EA1]"
                            onClick={ () => addKeyword() }
                        >
                            { getIcon("plus") }
                            <span>Aggiungi Parola</span>
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {
                            keywords.map( (keyword, index) => (
                                <div key={index} className="mt-3 flex items-center gap-4 py-1 px-4 border border-[#ACACAC] rounded">
                                    <span>{keyword}</span>
                                    <button type="button" className="ml-auto flex items-center gap-2.5 py-1 px-1 text-[#ff3d3d] hover:bg-[#ffdfdf] rounded cursor-pointer"
                                        onClick={ () => removeKeyword( index ) }
                                    >
                                        { getIcon("x") }
                                    </button>
                                </div>
                            ) )
                        }
                    </div>
                    <button type="button" className="mt-6 flex items-center gap-2.5 py-2 px-4 text-white bg-[#519AC8] rounded hover:bg-[#3A7EA1]"
                        onClick={ () => saveMetadata() }
                    >
                        { getIcon("save") }
                        <span>Salva Metadata</span>
                    </button>
                </div>
            </form>
        </section>
    )
}