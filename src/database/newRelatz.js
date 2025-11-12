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
              name: "Titolo",
              content: [],
              align: "left",
              fontFamily: "Helvetica",
              lineHeight: 1.2,
            },
            {
              type: "text",
              name: "Autore",
              content: [],
              align: "center",
              fontFamily: "Times-Roman",
              lineHeight: 1.2
            },
          ],
        },
        {
          type: "line",
          name: "Separatore",
          color: "#000000",
          thickness: 1,
          width: 100,
          align: "center",
          style: "solid",
          margin: { top: 4, bottom: 2 },
        },
      ],
    },
    footer: {
      visible: true,
      startFrom: 0,
      elements: [],
    },
    cover: {
      visible: true,
      elements: [],
    },
    index: {
      visible: true,
      elements: [],
    },
    elements: [],
    margin: { top: 0, bottom: 5, left: 0, right: 0 },
  };

  localStorage.setItem("Relatz", JSON.stringify(relatz));
}
