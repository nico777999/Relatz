import { useState, useEffect, useRef } from "react";
import TextDecoration from "./TextDecoration";

export default function TextDisplay({ text = [], setText }) {
  const [selection, setSelection] = useState({
    start: { node: 0, offset: 0 },
    end:   { node: 0, offset: 0 },
  });

  useEffect(() => {
    const newText = text.filter((element) => element.text.length !== 0);

    if (text.length === 0) {
      setText([{
        text: "",
        fontSize: 16,
        bold: false,
        italic: false,
        underline: false,
        strike: false,
        color: "#333",
        bg: "none",
      }]);
    } else if (newText.length !== text.length && text.length !== 1) {
      setText(newText);
    }
  }, [text]);

  const editorRef = useRef(null);

  const isCursor = (start, end) =>
    start.node === end.node && start.offset === end.offset;

  const updateCursor = (start, key) => ({
    start: { node: start.node, offset: start.offset + key.length },
    end:   { node: start.node, offset: start.offset + key.length },
  });

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

  const onKeyDown = (e) => {
    const { key, ctrlKey, metaKey, shiftKey } = e;
    const ctrl = ctrlKey || metaKey;

    e.preventDefault();

    if (ctrl) {
      switch (key) {
        case "b": return toggleBold();
        case "i": return toggleItalic();
        case "u": return toggleUnderline();
        case "c": return copySelection();
        case "x": return cutSelection();
        case "v": return pasteClipboard();
        default: return;
      }
    }

    if (key === "ArrowLeft")  return setSelection(moveCursorLeft(shiftKey));
    if (key === "ArrowRight") return setSelection(moveCursorRight(shiftKey));
    if (key === "Backspace")  return handleBackspace();
    if (key === "Delete")     return handleDelete();
    if (key === "Enter")      return insertNewLine();

    if (key.length === 1) return changeText(key, selection);
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const { start, end } = selection;
    const startSpan = editorRef.current.children[start.node];
    const endSpan   = editorRef.current.children[end.node];
    if (!startSpan || !endSpan) return;

    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(startSpan.firstChild || startSpan, start.offset);
    range.setEnd(endSpan.firstChild || endSpan, end.offset);

    sel.removeAllRanges();
    sel.addRange(range);
  }, [text, selection]);

  /** Inserimento testo o sostituzione selezione */
  const changeText = (key, sel = selection) => {
    const { start, end } = sel;
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
    const { start, end } = selection;
    let updatedStart = { node: start.node, offset: start.offset };

    if (start.offset === 0) {
      if (start.node === 0) return selection;
      updatedStart.node--;
      updatedStart.offset = text[updatedStart.node].text.length - 1;
    } else {
      updatedStart.offset--;
    }

    return {
      start: updatedStart,
      end: {
        node: shiftKey ? end.node : updatedStart.node,
        offset: shiftKey ? end.offset : updatedStart.offset,
      },
    };
  };

  const moveCursorRight = (shiftKey) => {
    const { start, end } = selection;
    let updatedEnd = { node: end.node, offset: end.offset };

    if (end.offset === text[end.node].text.length) {
      if (end.node === text.length - 1) return selection;
      updatedEnd.node++;
      updatedEnd.offset = 1;
    } else {
      updatedEnd.offset++;
    }

    return {
      start: {
        node: shiftKey ? start.node : updatedEnd.node,
        offset: shiftKey ? start.offset : updatedEnd.offset,
      },
      end: updatedEnd,
    };
  };

  const handleBackspace = () => {
    if (isCursor(selection.start, selection.end)) {
      const newSel = moveCursorLeft(true);
      changeText("", newSel);
    } else {
      changeText("", selection);
    }
  };

  const handleDelete = () => {
    if (isCursor(selection.start, selection.end)) {
      const newSel = moveCursorRight(true);
      changeText("", newSel);
    } else {
      changeText("", selection);
    }
  };

  const insertNewLine = () => {
    changeText("\n", selection);
  }

  const copySelection = () => {
    const { start, end } = selection;
    if (isCursor(start, end)) return; // niente da copiare se è solo cursore

    let copied = "";

    if (start.node === end.node) {
      // selezione all'interno dello stesso nodo
      copied = text[start.node].text.slice(start.offset, end.offset);
    } else {
      // parte iniziale dal nodo start
      copied += text[start.node].text.slice(start.offset);

      // nodi intermedi
      for (let i = start.node + 1; i < end.node; i++) {
        copied += text[i].text;
      }

      // parte finale dal nodo end
      copied += text[end.node].text.slice(0, end.offset);
    }

    // Copia negli appunti
    navigator.clipboard.writeText(copied).catch(err => {
      console.error("Errore nella copia:", err);
    });
  };

  const pasteClipboard = async () => {
    try {
      // prendiamo il testo dagli appunti
      const clipText = await navigator.clipboard.readText();
      // lo inseriamo nel testo
      changeText(clipText, selection);
    } catch (err) {
      alert("Errore durante la lettura dagli appunti:", err);
    }
  };

  const cutSelection = () => {
    if(isCursor(selection.start, selection.end)) return;
    copySelection();
    changeText("", selection);
  }

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

// inserire funzioni di stile e undo e redo