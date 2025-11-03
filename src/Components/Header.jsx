import { Link } from "react-router-dom"

import getIcon from "../icons"

export default function App() {
    return (
        <header className="flex justify-between py-1.5 border-b-2 border-[#ACACAC]">
            <h1 className="text-3xl font-bold text-[#519AC8]">Relatz</h1>
            <Link to={"/"} className="flex items-center gap-1.5 py-1 px-3.5 text-white bg-[#519AC8] rounded hover:bg-[#3A7EA1]">
                { getIcon( "home" ) }
                <span>Overview</span>
            </Link>
        </header>
    )
}