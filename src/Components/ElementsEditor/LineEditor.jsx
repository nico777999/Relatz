export default function LineEditor({element, setElements}) {
    return (
        <div className="py-2 px-4">
            <div className="flex justify-between">
                <label htmlFor="thickness">Imposta dimensione:</label>
                <input type="text" id="thickness" />
            </div>
        </div>
    )
}