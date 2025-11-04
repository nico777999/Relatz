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
  title: <testo>,
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
  title: "Capitolo 1",
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
  content: "",
  align: "left" | "center" | "right" | "justify",
  fontFamily: "Helvetica" | "Times-Roman" | "Courier",
  fontSize: <number>,
  lineHeight: <number>,
  indent: 0,
}
```

---

### 🔹 CONTENITORE IMMAGINI
```js
{
  type: "imageContainer",
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


## 🔸Tag di formattazione testo

|     Tag	   |   Effetto   |
|------------|-------------|
| [b]...[/b]` | Grassetto |
| [i]...[/i]	 | Corsivo |
| [u]...[/u] | Sottolineato |
| [s]...[/s] | Barrato (strike) |
| [color=#FF0000]...[/color] | Cambia colore testo |
| [bgcolor=#FFFF00]...[/bgcolor] | Sfondo evidenziato |