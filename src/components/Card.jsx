import React, { useEffect, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'

const Card = () => {
  const [parsedData, setParsedData] = useState([])

  useEffect(() => {
    const fetchTasks = () => {
      let data = localStorage.getItem("tasks")
      if(data){
        setParsedData(JSON.parse(data).reverse())
      }
    }
    fetchTasks()

    window.addEventListener('taskUpdated', fetchTasks)
    return () => window.removeEventListener('taskUpdated', fetchTasks)
  }, [])
  

  

  return (
    <>
        {parsedData && parsedData.map((item, index) => (
          <div key={index} className='h-fit border border-white rounded-xl bg-gray-800 shadow-lg flex-col break-inside-avoid mb-4'>
            <div className='w-full h-1/2 border-b border-gray-700 py-1 px-2 flex justify-between items-center'>
                <h3 className='text-left text-white font-medium text-md md:text-xl'>{item.title ? item.title : "Untitled"}</h3>
                <EllipsisVertical className="cursor-pointer" />
            </div>

            <div className='h-1/2 w-full'>
                <p className='text-white p-4 text-sm md:text-lg text-left whitespace-pre-wrap'>{item.task}</p>
            </div>
        </div>
        ))}
    </>

    
  )
}

export default Card