import newRelatz from "./newRelatz";

export default function getRelatz() {
    const relatz = localStorage.getItem("Relatz");
    if ( relatz != null ){
        return JSON.parse(relatz);
    }
    newRelatz();
    return getRelatz();
}