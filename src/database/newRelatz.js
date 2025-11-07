export default function newRelatz() {
    const relatz = {
    metadata: {
        title: "Senza Titolo",
        subject: "",
        author: "Mario Rossi",
        keywords: [],
        producer: "Relatz",
        creator: "pdf-lib (https://github.com/Hopding/pdf-lib)",
    },
    header: {
        visible: true,
        startFrom: 0,
        elements: [
            {
                type: "row",
                name: "Riga",
                justify: "space-between",
                gap: 10,
                elements: [
                {
                    type: "text",
                    name: "Testo",
                    content: "[b]{title}[/b]",
                    align: "left",
                    fontFamily: "Helvetica",
                    fontSize: 10,
                    lineHeight: 1.2
                },
                {
                    type: "text",
                    name: "Testo",
                    content: "{author}",
                    align: "center",
                    fontFamily: "Times-Roman",
                    fontSize: 10
                },
                {
                    type: "text",
                    name: "Testo",
                    content: "Pag. {pageNumber} di {totalPages}",
                    align: "right",
                    fontFamily: "Helvetica",
                    fontSize: 10
                }
                ]
            },
            {
                type: "line",
                name: "Linea",
                color: "#000000",
                thickness: 1,
                width: 100,
                align: "center",
                style: "solid",
                margin: { top: 4, bottom: 2 }
            }
        ]
    },
    footer: {
        visible: true,
        startFrom: 0,
        elements: [],
    },
    cover: {
        visible: true,
        elements: []
    },
    index: {
        visible: true,
        elements: []
    },
    elements: [],
    margin: { top: 0, bottom: 5, left: 0, right: 0 },
    };

    localStorage.setItem("Relatz", JSON.stringify(relatz));
}