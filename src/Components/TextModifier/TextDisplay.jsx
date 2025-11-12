import TextDecoration from "./TextDecoration";

export default function TextDisplay({ text, setText }) {

  return (
    <>
    <div className="w-full h-28 p-1.5 border border-b-0 border-[#ACACAC] rounded-t overflow-y-scroll" onKeyDown={(e) => e.preventDefault()}  contentEditable={true}>

    </div>
    <TextDecoration 
      text={text}
      setText={setText}
    />
    </>
  );
}