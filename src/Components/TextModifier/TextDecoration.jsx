import getIcon from "../../icons";

export default function TextDecoration({ text, subtext, setText }) {
  return (
    <div className="flex items-center justify-evenly py-1 px-3 border border-[#ACACAC] rounded-b">
      <div>
        <input type="number" min={6} className="w-14 px-2 py-0.5 border border-[#ACACAC] rounded"/>
      </div>
      <div>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("bold")}        
        </button>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("italic")}
        </button>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("underline")}
        </button>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("strike")}
        </button>
      </div>
      <div>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("color")}        
        </button>
        <button className="py-0.5 px-1 border border-white rounded cursor-pointer hover:border-[#ACACAC] hover:bg-[#F3F3F3]">
          {getIcon("bgColor")}
        </button>
      </div>
    </div>
  );
}
