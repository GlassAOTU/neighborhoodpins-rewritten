export default function Navbar() {
    return (
        <nav className="text-white bg-emerald-800 px-5 py-4">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <p>icon</p>
                    <p>wording</p>
                </div>
                <div className="flex flex-row gap-4">
                    <p>map</p>
                    <p>reports</p>
                    <p>resources</p>
                    <p>about</p>
                    <p>account</p>
                </div>
            </div>
        </nav>
    )
}