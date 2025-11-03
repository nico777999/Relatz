import importRelatz from "../database/importRelatz";

import Editor from "../Components/Editor";

export default function HeaderSetter({ relatz, setRelatz }) {
    const options = [
        {
            startFrom: 0,
            title: 'Tutte le pagine',
            description: "Applica l'intestazione a tutte le pagine"
        },
        {
            startFrom: 1,
            title: 'Escludi copertina',
            description: "Non applicare l'intestazione alla copertina"
        },
        {
            startFrom: 2,
            title: 'Escludi copertina e indice',
            description: "Non applicare l'intestazione alla copertina e all'indice"
        },
        {
            startFrom: -1,
            title: 'Nessuna intestazione',
            description: "Non applicare l'intestazione a nessuna pagina"
        }
    ];

    const handleOptionClick = (startFrom) => {
        const newRelatz = { ...relatz };
        newRelatz.header.startFrom = startFrom;

        setRelatz(newRelatz);
        importRelatz(newRelatz);
    };

    const setElements = (newElements) => {
        const newRelatz = { ...relatz };
        newRelatz.header.elements = newElements;

        setRelatz(newRelatz);
        importRelatz(newRelatz);
    }

    return (
        <section>
            <h2 className='py-5 text-3xl'>Dai un'intestazione alle pagine:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                {options.map(option => (
                    <div
                        key={option.startFrom}
                        onClick={() => handleOptionClick(option.startFrom)}
                        className={`p-4 cursor-pointer border-2 rounded hover:bg-[#F3F3F3]
                            ${relatz.header.startFrom === option.startFrom ? 'border-blue-500 bg-blue-50' : 'border-[#ACACAC]'}`}
                    >
                        <h3 className='text-lg font-semibold'>{option.title}</h3>
                        <p className='text-[#333]'>{option.description}</p>
                    </div>
                ))}
            </div>

            <h2 className='py-5 text-3xl'>Personalizza la tua intestazione :</h2>
            <Editor 
                elements = { relatz.header.elements }
                setElements = { setElements }
            />
        </section>
    );
}