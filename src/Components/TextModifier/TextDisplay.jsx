import { useState, useEffect, useRef } from "react";
import TextDecoration from "./TextDecoration";

export default function TextDisplay({ text, setText }) {
  const [selection, setSelection] = useState({
    start: { node: 0, offset: 0 },
    end:   { node: 0, offset: 0 },
  });

  const editorRef = useRef(null);

  /** Utility: controlla se la selezione è solo un cursore */
  const isCursor = (start, end) =>
    start.node === end.node && start.offset === end.offset;

  /** Utility: aggiorna posizione del cursore dopo inserimento */
  const updateCursor = (start, key) => ({
    start: { node: start.node, offset: start.offset + key.length },
    end:   { node: start.node, offset: start.offset + key.length },
  });

  /** Calcola posizione della selezione */
  const getSelectionPosition = (root) => {
    const sel = window.getSelection();
    if (!sel?.anchorNode || !sel?.focusNode) return;

    const anchorSpan = sel.anchorNode.nodeType === Node.TEXT_NODE
      ? sel.anchorNode.parentNode
      : sel.anchorNode;
    const focusSpan = sel.focusNode.nodeType === Node.TEXT_NODE
      ? sel.focusNode.parentNode
      : sel.focusNode;

    let startNode = -1;
    let endNode = -1;

    for (let i = 0; i < root.children.length; i++) {
      if (root.children[i] === anchorSpan) startNode = i;
      if (root.children[i] === focusSpan) endNode = i;
    }

    if (startNode === -1 || endNode === -1) return;

    let startOffset = sel.anchorOffset;
    let endOffset = sel.focusOffset;

    // Selezione invertita → normalizza
    if (startNode > endNode || (startNode === endNode && startOffset > endOffset)) {
      [startNode, endNode] = [endNode, startNode];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    setSelection({
      start: { node: startNode, offset: startOffset },
      end:   { node: endNode, offset: endOffset },
    });
  };

  useEffect(() => {
    console.log("Nuova selezione:", selection);
  }, [selection]);

  /** Gestione tasti premuti */
  const onKeyDown = (e) => {
    const { key, ctrlKey, metaKey, shiftKey } = e;
    const ctrl = ctrlKey || metaKey;

    e.preventDefault();

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

    if (key === "ArrowLeft")  return moveCursorLeft(shiftKey);
    if (key === "ArrowRight") return moveCursorRight(shiftKey);
    if (key === "Backspace")  return handleBackspace();
    if (key === "Delete")     return handleDelete();
    if (key === "Enter")      return insertNewLine();

    if (key.length === 1) return changeText(key);
  };

  /** Riposiziona manualmente il cursore dopo il rendering */
  useEffect(() => {
    if (!editorRef.current) return;

    const { start, end } = selection;
    const startSpan = editorRef.current.children[start.node];
    const endSpan   = editorRef.current.children[end.node];
    if (!startSpan || !endSpan) return;

    const range = document.createRange();
    const sel = window.getSelection();

    // Selezione estesa o caret singolo
    range.setStart(startSpan.firstChild || startSpan, start.offset);
    range.setEnd(endSpan.firstChild || endSpan, end.offset);

    sel.removeAllRanges();
    sel.addRange(range);
  }, [text, selection]);

  /** Inserimento testo o sostituzione selezione */
  const changeText = (key) => {
    const { start, end } = selection;
    let updatedText = text.map(t => ({ ...t }));

    if (isCursor(start, end)) {
      const original = updatedText[start.node].text;
      updatedText[start.node].text =
        original.slice(0, start.offset) + key + original.slice(start.offset);

      setText(updatedText);
      setSelection(updateCursor(start, key));
      return;
    }

    if (start.node === end.node) {
      updatedText[start.node].text =
        updatedText[start.node].text.slice(0, start.offset) +
        key +
        updatedText[start.node].text.slice(end.offset);
    } else {
      updatedText[end.node].text = updatedText[end.node].text.slice(end.offset);
      updatedText[start.node].text =
        updatedText[start.node].text.slice(0, start.offset) + key;
      updatedText = updatedText.filter((_, i) => !(i > start.node && i < end.node));
    }

    setText(updatedText);
    setSelection(updateCursor(start, key));
  };

  const moveCursorLeft = (shiftKey) => {
    const { end, start } = selection;

    // Calcola nuova posizione di fine
    let updatedEnd = { node: end.node, offset: end.offset };
    if (end.offset === 0) {
      if (end.node === 0) return;
      updatedEnd.node--;
      updatedEnd.offset = text[updatedEnd.node].text.length - 1;
    } else {
      updatedEnd.offset--;
    }

    // Calcola nuova posizione di inizio (se shift è attivo mantieni l'originale)
    const updatedSelection = updateSelection(updatedEnd, start, shiftKey);

    setSelection(updatedSelection);
  };

  const moveCursorRight = (shiftKey) => {
    const { start, end } = selection;

    // Calcola nuova posizione di fine
    let updatedEnd = { node: end.node, offset: end.offset };
    if (end.offset === text[end.node].text.length) {
      if (end.node === text.length - 1) return;

      updatedEnd.node++;
      updatedEnd.offset = 0;
    } else {
      updatedEnd.offset++;
    }

    // Calcola nuova posizione di inizio (se shift è attivo mantieni l'originale)
    const updatedSelection = updateSelection(updatedEnd, start, shiftKey);

    setSelection(updatedSelection);
  };

  // Funzione comune per calcolare start/end
  const updateSelection = (newEnd, start, shiftKey) => ({
    start: {
      node: shiftKey ? start.node : newEnd.node,
      offset: shiftKey ? start.offset : newEnd.offset,
    },
    end: newEnd,
  });

  return (
    <>
      <div
        ref={editorRef}
        className="w-full h-28 p-1.5 border border-b-0 border-[#ACACAC] rounded-t overflow-y-scroll"
        contentEditable
        suppressContentEditableWarning
        onMouseUp={() => getSelectionPosition(editorRef.current)}
        onKeyUp={() => getSelectionPosition(editorRef.current)}
        onKeyDown={onKeyDown}
      >
        {text.map((el, i) => (
          <span
            key={i}
            className={`
              whitespace-pre-wrap
              text-[${el.fontSize}px]
              ${el.bold ? "font-bold" : ""}
              ${el.italic ? "italic" : ""}
              ${el.underline ? "underline" : ""}
              ${el.strike ? "line-through" : ""}
            `}
            style={{
              color: el.color,
              background: el.bg !== "none" ? el.bg : "transparent",
            }}
          >
            {el.text}
          </span>
        ))}
      </div>

      <TextDecoration text={text} setText={setText} />
    </>
  );
}

// tutte le funzioni
// moveLeft non seleziona bene