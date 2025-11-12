# 📘 Struttura dati Relatz


## Metadati di base

```js
const Relatz = {
  meta: {
    title: "Senza Titolo",
    subject: "",
    author: "Mario Rossi",
    keywords: [],
    producer: "Relatz",
    creator: "pdf-lib (https://github.com/Hopding/pdf-lib)",
    creationDate: new Date(),
    modificationDate: new Date(),
  },
  header: {
    visible: true,
    startFrom: 0,
    elements: [],
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
```

---

## Tipologie di elementi

### 🔹 SEZIONE

```js
{
  type: "section",
  name: "sezione",
  elements: [
    // qualsiasi altro elemento, inclusi altre sezioni
  ]
  margin: { top: 0, bottom: 5, left: 0, right: 0 },
}
```

Esempio di sezione annidata:
```js
{
  type: "section",
  name: "Capitolo 1",
  elements: [
    { type: "text", content: "Introduzione..." },
    {
      type: "section",
      title: "Sottosezione 1.1",
      elements: [
        { type: "text", content: "Dettagli tecnici..." }
      ],
      margin: { top: 0, bottom: 5, left: 0, right: 0 },
    }
  ],
  margin: { top: 0, bottom: 5, left: 0, right: 0 },
}
```

---

### 🔹 FLEX CONTAINER
```js
{
  type: "row",
  name: "Riga"
  justify: "start" | "center" | "end" | "space-between",
  gap: 10,
  elements: [
    
  ]
}
```

---

### 🔹 TESTO
```js
{
  type: "text",
  name: "Testo",
  content: [
    {
      text: "",
      fontSize: <number>,
      bold: true / false,
      italic: true / false,
      undeline: true / false,
      strike: true / false,
      color: #;
      bg: # / none,
    }
  ],
  fontFamily: "Helvetica" | "Times-Roman" | "Courier",
  align: "left" | "center" | "right" | "justify",
  lineHeight: <number>
}
```

---

### 🔹 CONTENITORE IMMAGINI
```js
{
  type: "imagesContainer",
  name: "Contenitore di immagini",
  height: <number>,
  align: "left" | "center" | "right" | "justify",
  layout: "row" | "column",
  gap: 10,
  images: [
    {
      link: "" | null,
      savedID: "" | null,
      caption: "Figura 1: esempio di immagine",
      border: { color: "#000", width: 1, radius: 4 }
    }
  ]
}
```

---

### 🔹 LINEA
```js
{
  type: "line",
  name: "Linea",
  color: "#000000",
  thickness: 1,
  width: <number>, // rappresenta percentuale
  align: "center" | "left" | "right",
  style: "solid" | "dashed" | "dotted",
  margin: { top: 5, bottom: 5 }
}
```

---

### 🔹 TABELLA

```js
{
  type: "table",
  name: "Tabella",
  dimensions: {
    rows: <number>,
    columns: <number>,
  },
  cellSize: {
    width: <number>,
    height: <number>
  },
  borders: {
    show: true,
    color: "#000000",
    width: 1
  },
  rows: [
    [
      {
        content: <testo>,
        bgColor: "#FFFFFF"
      }
    ]
  ]
}
```

### 🔹 LISTA

```js
{
  type: "list",
  name: "Lista",
  ordered: true,
  simbol: "-",
  elements: [
    <testo>
  ]
}
```

---

### 🔹 SPACE

```js
{
  type: "space",
  name: "Spazio",
  size: 20,
}
```

---

## 🔸 Variabili dinamiche

| Variabile | Descrizione |
|------------|-------------|
| `{pageNumber}` | Numero pagina corrente |
| `{totalPages}` | Totale pagine |
| `{title}` | Titolo del documento |
| `{author}` | Autore |
| `{date}` | Data corrente (formattata) |

Esempio:
```js
{
  type: "text",
  content: "Pagina {pageNumber} di {totalPages} — {title}",
  align: "center",
  fontSize: 10
}
```
