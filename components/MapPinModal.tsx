import React, { useState } from 'react'

import ConeIcon from '@/assets/icons/traffic-cone.svg'
import TreeIcon from '@/assets/icons/tree-pine.svg'
import LightIcon from '@/assets/icons/lightbulb-off.svg'
import FloodIcon from '@/assets/icons/waves.svg'

export default function MapPinModal({
    point,
    address,
    municipality,
    uuid,
    onClose,
    onDeletePin,
    fetchDataAndAddToMap, // Add the new prop
}: any) {
    const [issueSelection, setIssueSelection] = useState('');
    const [showError, setShowError] = useState(false);

    const createFinalData = () => {
        return {
            latitude: parseFloat(point.lat),
            longitude: parseFloat(point.lng),
            issue_type: parseInt(issueSelection),
            street: address[0],
            town: address[1],
            zipcode: address[2],
            municipality: municipality,
        };
    };

    const onSubmit = async () => {
        if (issueSelection === '') {
            setShowError(true);
        } else {
            const finalData = createFinalData();
            try {
                const response = await fetch('/api/submit-pin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalData),
                });

                if (response.ok) {
                    await fetchDataAndAddToMap(); // Call to update the map with new pins
                    onClose(); // Close the modal
                } else {
                    console.error('Failed to submit pin:', await response.json());
                }
            } catch (error) {
                console.error('Error submitting pin:', error);
            }
        }
    };

    const handleCancel = () => {
        // onDeletePin()
        onClose()
    }

    const handleSubmit = () => {
        onSubmit()
    }

    // changes state variable on radio button change
    const onIssueChange = (e: any) => {
        setIssueSelection(e.target.value)
    }
    // const onSeverityChange = (e: any) => {
    //     setSeveritySelection(e.target.value)
    // }

    return (
        <>


            <div
                className='fixed top-0 left-0 w-full h-full flex items-center justify-center'
                // close modal if the background is clicked on
                onClick={handleCancel}
            >
                {/* styling and code for the main modal window */}
                <div
                    className='bg-white rounded-lg p-5 gap-5 flex flex-col sm:gap-10 shadow-xl sm:p-10 z-'
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
                >
                    <div>
                        <div className='text-center  border-neutral-400 font-bold text-3xl'>
                            Drop a Pin
                        </div>
                    </div>

                    <div>
                        <div className='mb-3 text-center font-semibold text-2xl'>
                            Where?
                        </div>
                        <div className='text-lg text-center'>
                            {/* 
								address[0] == road name
								address[1] == town name
								address[2] == zipcode
                                */}
                            {address[0]}, {address[1]}, {address[2]}
                            <div className=' font-semibold'>
                                Town of {municipality}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='mb-3 text-center font-semibold text-2xl'>
                            What’s the problem?
                        </div>

                        {/* issues radio buttons */}
                        <div className='flex flex-row w-96 gap-2'>
                            <label className='flex-auto text-center'>
                                <input
                                    className='hidden peer'
                                    type='radio'
                                    name='issues'
                                    value='1'
                                    checked={issueSelection === '1'}
                                    onChange={onIssueChange}
                                    required
                                />
                                <span className='flex justify-center flex-col items-center w-full h-full py-2 ring-1 ring-inset hover:text-orange-700 peer-checked:text-orange-700 ring-neutral-400 hover:ring-orange-700 rounded-lg peer-checked:ring-orange-700 peer-checked:ring-2 transition-all ease-in-out cursor-pointer'>
                                    <ConeIcon />
                                    <p className='text-black'>
                                        Pothole
                                    </p>
                                </span>
                            </label>
                            <label className='flex-auto text-center'>
                                <input
                                    className='hidden peer'
                                    type='radio'
                                    name='issues'
                                    value='2'
                                    checked={issueSelection === '2'}
                                    onChange={onIssueChange}
                                />
                                <span className='flex justify-center flex-col items-center w-full h-full py-2 ring-1 ring-inset hover:text-green-700 peer-checked:text-green-700 ring-neutral-400 hover:ring-green-700 rounded-lg peer-checked:ring-green-700 peer-checked:ring-2 transition-all ease-in-out cursor-pointer'>
                                    <TreeIcon />
                                    <p className='text-black'>
                                        Downed Tree
                                    </p>
                                </span>
                            </label>
                            <label className='flex-auto text-center'>
                                <input
                                    className='hidden peer'
                                    type='radio'
                                    name='issues'
                                    value='3'
                                    checked={issueSelection === '3'}
                                    onChange={onIssueChange}
                                />
                                <span className='flex justify-center flex-col items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:ring-yellow-500 hover:text-yellow-500 rounded-lg peer-checked:text-yellow-500 peer-checked:ring-yellow-500 peer-checked:ring-2 transition-all ease-in-out cursor-pointer'>
                                    <LightIcon />
                                    <p className='text-black'>
                                        Streetlight
                                    </p>
                                </span>
                            </label>
                            <label className='flex-auto text-center'>
                                <input
                                    className='hidden peer'
                                    type='radio'
                                    name='issues'
                                    value='4'
                                    checked={issueSelection === '4'}
                                    onChange={onIssueChange}
                                />
                                <span className='flex justify-center flex-col items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 rounded-lg hover:ring-blue-600 hover:text-blue-600 peer-checked:text-blue-600 peer-checked:ring-blue-600 peer-checked:ring-2 transition-all ease-in-out cursor-pointer'>
                                    <FloodIcon />
                                    <p className='text-black'>Flooding</p>
                                </span>
                            </label>
                        </div>
                    </div>

                    {showError && (
                        <p className='text-white text-center bg-red-500 p-3 rounded-md'>
                            Please select an issue
                        </p>
                    )}

                    {/* styling and code for the cancel and submit button */}
                    <div className='flex flex-row flex-wrap justify-end gap-2 content-center'>
                        <button
                            onClick={handleCancel}
                            className='text-gray-950 rounded-lg ring-1 ring-inset ring-neutral-400 px-5 py-2 hover:bg-neutral-200 transition ease-in-out'
                        >
                            Cancel
                        </button>
                        <input
                            type='button'
                            value='Submit'
                            onClick={handleSubmit}
                            className='text-white rounded-lg bg-emerald-700 font-semibold px-5 py-2 hover:bg-emerald-800 transition ease-in-out cursor-pointer'
                        />
                    </div>
                    {/* </div> */}
                </div>
            </div>

        </>
    )
}
