import getIcon from "../../icons";

export default function SectionEditor({
  element,
  setElement,
  setDisplayedElements,
}) {
  return (
    <div className="hidden group-hover:block py-2 px-4">
      <button
        onClick={() => setDisplayedElements(element.elements)}
        className="w-full flex gap-2.5 py-1 px-4 border border-[#ACACAC] hover:bg-[#F3F3F3] rounded"
      >
        {getIcon("enter")}
        <span>Entra nella sezione</span>
      </button>
    </div>
  );
}
