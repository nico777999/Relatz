import TextDecoration from "./TextDecoration";

export default function TextDisplay({ text, setText }) {

  function handleSelection(editor) {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0 && editor.contains(selection.anchorNode)) {
      console.log("Hai selezionato:", text);
    } else {
      return;
    }
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    console.log("Posizione selezione:", rect);
  }

  return (
    <div id="editor" onKeyUp={(e) => handleSelection(e.target)} onMouseUp={(e) => handleSelection(e.target)} contentEditable={true}>
      ciao
    </div>
  );

  // bisogna gestire meglio la struttura dati di text, all'interno di content dovremmo avere piu oggetti ognuno con il suo stile in modo da poter gestire bene ogni cosa
}
