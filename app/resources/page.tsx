
'use client'

import Accordion from "@/components/Accordion";
import { useEffect, useState } from "react";

type Town = {
    id: string,
    name: string,
    department: string,
    phone_number: string,
    timing: string,
    website: string,
    email: string,
    address: string
}

export default function Reports() {

    const [towns, setTowns] = useState<Town[]>([]);

    useEffect(() => {
        fetch('/api/list-towns')
            .then(res => res.json())
            .then(setTowns)
            .catch(console.error);
    }, []);

    return (
        <main className="min-h-screen bg-stone-100 px-4 py-10">
            <section className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    The Towns of Long Island
                </h1>

                <div className="bg-white rounded-xl shadow-md px-6 py-4 space-y-4">
                    {towns.map((town) => (
                        <Accordion key={town.id} title={town.name}>
                            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="font-semibold">{town.department}</p>
                                    <p>{town.address}</p>
                                    <p>From {town.timing}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold">Contact</p>
                                    <a href={`tel:${town.phone_number}`} className="text-emerald-700 hover:underline">
                                        {town.phone_number}
                                    </a>
                                    <p>{town.email}</p>
                                    <a href={town.website} className="text-emerald-700 hover:underline">
                                        {town.website}
                                    </a>
                                </div>
                            </div>
                        </Accordion>
                    ))}
                </div>
            </section>
        </main>

    )
}