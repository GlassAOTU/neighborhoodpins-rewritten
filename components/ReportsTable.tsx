'use client'

import { useEffect, useState } from "react";

export default function ReportsTable() {

    const [tableData, setTableData] = useState<Array<{
        id: number;
        issue_type_name: string;
        street: string;
        town: string;
        zipcode: string;
        municipality: string;
        phone_number: string;
    }>>([]);


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

    useEffect(() => {
        getPins()
    }, [])

    if (tableData.length > 0) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Issue Type</th>
                        <th>Street</th>
                        <th>Town</th>
                        <th>Zipcode</th>
                        <th>Municipality</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((pin, index) => (
                        <tr key={index}>
                            <td>{pin.issue_type_name}</td>
                            <td>{pin.street}</td>
                            <td>{pin.town}</td>
                            <td>{pin.zipcode}</td>
                            <td>{pin.municipality}</td>
                            <td>{pin.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        );
    }

}