import React from 'react'
import { EllipsisVertical } from 'lucide-react'

const Card = () => {
  return (
    <>
        <div className='h-fit border border-white rounded-xl bg-gray-800 shadow-lg flex-col'>
            <div className='w-full h-1/2 border-b border-gray-700 py-1 px-2 flex justify-between items-center'>
                <h3 className='text-left text-white font-medium text-md md:text-xl'>Aj ka gyan smapt</h3>
                <EllipsisVertical className="cursor-pointer" />
            </div>

            <div className='h-1/2 w-full'>
                <p className='text-white p-4 text-sm md:text-lg text-left'>This is a sample task description. It gives more details about the task to be done This is a sample task description. It gives more details about the task to be done.</p>
            </div>
        </div>
    </>

    
  )
}

export default Card