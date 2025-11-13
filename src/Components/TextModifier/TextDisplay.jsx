import { useState, useEffect, useRef } from "react";

import TextDecoration from "./TextDecoration";

export default function TextDisplay({ text, setText }) {
  const [subText, setSubText] = useState({
    start: {
      node: 0,
      pos: 0
    },
    end: {
      node: 0,
      pos: 0
    },
  });

  const editorRef = useRef(null);

  const getSelectionPosition = (root) => {
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode || !sel.focusNode) return;

    // Risali allo span se sei dentro un TextNode
    const anchorSpan = sel.anchorNode.nodeType === Node.TEXT_NODE 
      ? sel.anchorNode.parentNode 
      : sel.anchorNode;
    const focusSpan = sel.focusNode.nodeType === Node.TEXT_NODE 
      ? sel.focusNode.parentNode 
      : sel.focusNode;

    let startNode = -1;
    let endNode = -1;

    // Trova gli indici dei <span> figli del root che corrispondono alla selezione
    for (let i = 0; i < root.children.length; i++) {
      if (root.children[i] === anchorSpan) startNode = i;
      if (root.children[i] === focusSpan) endNode = i;
    }

    // Se non troviamo corrispondenza, la selezione non ci interessa
    if (startNode === -1 || endNode === -1) return;

    let startOffset = sel.anchorOffset;
    let endOffset = sel.focusOffset;

    // Se la selezione è invertita (partita da destra), invertiamo i valori
    if (startNode > endNode || (startNode === endNode && startOffset > endOffset)) {
      [startNode, endNode] = [endNode, startNode];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    // Aggiorniamo lo state con i dati della selezione
    setSubText({
      start: { node: startNode, pos: startOffset },
      end: { node: endNode, pos: endOffset }
    });
  }

  const onKeyDown = (e) => {
    const key = e.key;
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    // Impedisci sempre il default
    e.preventDefault();

    // 1. Combinazioni da ignorare/gestire altrove (CTRL + ecc)
    if (ctrl) {
      switch (key) {
        case "b": return toggleBold();
        case "i": return toggleItalic();
        case "u": return toggleUnderline();
        case "z": return undo();
        case "y": return redo();
        case "c": return copySelection();
        case "x": return cutSelection();
        case "v": return pasteClipboard();
        default: return;
      }
    }

    // 2. Tasti di navigazione
    if (key === "ArrowLeft") return moveCursorLeft(shift);
    if (key === "ArrowRight") return moveCursorRight(shift);

    // 3. Backspace / Delete
    if (key === "Backspace") return handleBackspace();
    if (key === "Delete") return handleDelete();

    // 4. Enter
    if (key === "Enter") return insertNewLine();

    // 5. Se è un carattere stampabile
    if (key.length === 1) {
      return changeText(key);
    }
  };

  useEffect(() => {
    console.log("Nuovo subText:", subText);
  }, [subText]);

  return (
    <>
      <div
        ref={editorRef}
        className="w-full h-28 p-1.5 border border-b-0 border-[#ACACAC] rounded-t overflow-y-scroll"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onMouseUp={(e) => {
          getSelectionPosition(editorRef.current);
        }}
        onKeyUp={(e) => {
          getSelectionPosition(editorRef.current);
        }}
        onKeyDown={(e) => onKeyDown(e)}
      >
        {text.map((element, index) => (
          <span
            key={index}
            className={`
              text-[${element.fontSize}px]
              ${element.bold ? "font-bold" : ""}
              ${element.italic ? "italic" : ""}
              ${element.underline ? "underline" : ""}
              ${element.strike ? "line-through" : ""}
            `}
            style={{
              color: element.color,
              background: element.bg !== "none" ? element.bg : "transparent",
            }}
          >
            {element.text}
          </span>
        ))}
      </div>

      <TextDecoration text={text} setText={setText} />
    </>
  );
}

// implementare tutte le funzioni per la gestione degli input all interno dell contentEditable div