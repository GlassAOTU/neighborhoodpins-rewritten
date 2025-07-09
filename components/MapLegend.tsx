export default function MapLegend() {
    return (
        <div
            className="absolute bottom-4 left-4 bg-white p-5 rounded shadow z-20 text-sm pointer-events-auto"
        >
            <div>
                <div className='text-md font-semibold p-2 text-center text-lg'>
                    Color Legend
                </div>

                <div className='flex items-center my-2 mx-2'>
                    <div className='w-5 h-5 bg-linear-to-b from-orange-400 to-orange-700 rounded-full mr-2 shadow-md shadow-orange-800/50'></div>
                    <span>Pothole</span>
                </div>

                <div className='flex items-center my-2 mx-2'>
                    <div className='w-5 h-5 bg-linear-to-b from-green-400 to-green-700 rounded-full mr-2 shadow-md shadow-green-800/50'></div>
                    <span>Fallen tree</span>
                </div>


                <div className='flex items-center my-2 mx-2'>
                    <div className='w-5 h-5 bg-linear-to-b from-yellow-400 to-yellow-600 rounded-full mr-2 shadow-md shadow-yellow-700/50'></div>
                    <span>Broken streetlight</span>
                </div>

                <div className='flex items-center my-2 mx-2'>
                    <div className='w-5 h-5 bg-linear-to-b from-blue-400 to-blue-700 rounded-full mr-2 shadow-md shadow-blue-700/50'></div>
                    <span>Flood</span>
                </div>
            </div>
        </div>
    );
}
