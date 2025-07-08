import { useState } from "react";

export default function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-gray-300">
            <button
                className="w-full flex justify-between items-center py-4 text-lg font-semibold text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="ml-2">{isOpen ? "-" : "+"}</span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-2">
                    {children}
                </div>
            </div>
        </div>
    )
}
