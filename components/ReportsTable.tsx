'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportsTable() {

    const [tableData, setTableData] = useState<Array<{
        id: number;
        issue_type_name: string;
        street: string;
        town: string;
        zipcode: string;
        municipality: string;
        date_created: string;
    }>>([]);

    const [sortBy, setSortBy] = useState<'issue_type_name' | 'date_created' | 'zipcode' | 'municipality'>('date_created');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [issueTypeFilter, setIssueTypeFilter] = useState('');
    const [zipcodeFilter, setZipcodeFilter] = useState('');


    async function getPins() {
        try {
            const response = await fetch('/api/get-pins', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            console.log(data)

            setTableData(data)

        } catch (error) {
            console.error('Error fetching pins:', error);
        }
    }



    function handleSort(column: 'issue_type_name' | 'date_created' | 'zipcode' | 'municipality') {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    }

    const sortedData = [...tableData].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (sortBy === 'date_created') {
            const dateA = new Date(valA);
            const dateB = new Date(valB);
            return sortOrder === 'asc'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        }

        // String or numeric sort (e.g., zipcode, issue_type_name)
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData.filter((item) => {
        const matchesIssue = issueTypeFilter === '' || item.issue_type_name.toLowerCase() === issueTypeFilter.toLowerCase();
        const matchesZip = zipcodeFilter === '' || item.zipcode.includes(zipcodeFilter);
        return matchesIssue && matchesZip;
    });


    // async function handleDelete(pinId: number) {
    //     const res = await fetch('/api/delete-pin', {
    //         method: 'POST', // or DELETE — see below
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ id: pinId }),
    //     });

    //     if (res.ok) {
    //         setTableData(prev => prev.filter(pin => pin.id !== pinId));
    //     } else {
    //         console.error('Failed to delete pin');
    //     }
    // }

    function IssueIcon({ type }: { type: string }) {
        switch (type.toLowerCase()) {
            case 'flood':
                return <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>;
            case 'streetlight out':
                return <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" /><path d="m2 2 20 20" /><path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
            case 'pothole':
                return <svg className="w-5 h-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.05 10.966a5 2.5 0 0 1-8.1 0" /><path d="m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04" /><path d="M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z" /><path d="M9.194 6.57a5 2.5 0 0 0 5.61 0" /></svg>
            case 'downed tree':
                return <svg className='w-5 h-5 text-green-600' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" /><path d="M12 22v-3" /></svg>
            default:
                return null;
        }
    }



    useEffect(() => {
        getPins()
    }, [])

    if (tableData.length > 0) {
        return (
            <>
                <div className="flex gap-4 items-center mb-4">
                    <div className="relative inline-block">
                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                        <select
                            className="appearance-none h-9 px-3 pr-8 rounded outline-1 outline-stone-300 bg-white shadow-md text-md"
                            value={issueTypeFilter}
                            onChange={(e) => setIssueTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Flood">Flood</option>
                            <option value="Streetlight Out">Streetlight out</option>
                            <option value="Pothole">Pothole</option>
                            <option value="Downed Tree">Downed tree</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="Search Zipcode"
                        className="px-2 py-1 h-9 rounded bg-white shadow-md focus:shadow-md/25 transition-all text-md outline outline-stone-300 focus:outline-stone-600 sm:w-auto w-36"
                        value={zipcodeFilter}
                        onChange={(e) => setZipcodeFilter(e.target.value)}
                    />
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


                    <table className="w-full text-sm text-left rtl:text-right text-stone-500">
                        <thead className="text-md text-stone-700 bg-stone-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 select-none" onClick={() => handleSort('issue_type_name')}>
                                    <div className="flex items-center">
                                        Issue Type
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 select-none">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 select-none" onClick={() => handleSort('zipcode')}>
                                    <div className="flex items-center">
                                        Zipcode
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 select-none" onClick={() => handleSort('municipality')}>
                                    <div className="flex items-center">
                                        Municipality
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 select-none" onClick={() => handleSort('date_created')}>
                                    <div className="flex items-center">
                                        Date
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                <div>Delete Pin</div>
                                </th> */}
                            </tr>
                        </thead>


                        <tbody>
                            {filteredData.map((pin, index) => (
                                <tr key={index} className="bg-white border-b border-stone-200">
                                    <td scope="row" className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap flex flex-row gap-4"><IssueIcon type={pin.issue_type_name} />{pin.issue_type_name}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap">{pin.street}, {pin.town}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap">{pin.zipcode}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap">{pin.municipality}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap">
                                        {pin.date_created && (
                                            new Date(pin.date_created).toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                year: 'numeric',
                                            })
                                        )}
                                    </td>
                                    {/* <td className="">
                                    <div className="flex justify-center items-center">
                                    <button
                                    onClick={() => handleDelete(pin.id)}
                                    className="text-red-600 hover:text-red-800 p-2 rounded-full cursor-pointer"
                                    aria-label="Delete Pin"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    </button>
                                    </div>
                                    </td> */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </>
        );
    } else {
        return <p className="text-md text-stone-700 bg-white p-6 rounded-lg shadow-md font-semibold">There aren't any pins submitted.</p>
    }

}
