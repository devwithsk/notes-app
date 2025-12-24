import React, { useEffect, useState, useRef } from 'react'
import { EllipsisVertical } from 'lucide-react'

const Card = ({ setEditingTask }) => {
  const [parsedData, setParsedData] = useState([])
  const [openMenuId, setOpenMenuId] = useState(null)
  const menuRefs = useRef({})

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null) {
        const menuElement = menuRefs.current[openMenuId]
        if (menuElement && !menuElement.contains(event.target)) {
          setOpenMenuId(null)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuId])

  const handleMenuToggle = (index) => {
    setOpenMenuId(openMenuId === index ? null : index)
  }

  const handleEdit = (index) => {
    // Get original index from localStorage (since parsedData is reversed)
    const totalTasks = parsedData.length
    const originalIndex = totalTasks - 1 - index
    setEditingTask(originalIndex)
    setOpenMenuId(null)
  }

  const handleDelete = (index) => {
    // Get original index from localStorage
    const totalTasks = parsedData.length
    const originalIndex = totalTasks - 1 - index
    
    const allData = JSON.parse(localStorage.getItem("tasks"))
    const updatedData = allData.filter((_, i) => i !== originalIndex)
    localStorage.setItem("tasks", JSON.stringify(updatedData))
    
    setParsedData(updatedData.reverse())
    setOpenMenuId(null)
    window.dispatchEvent(new Event("taskUpdated"))
  }

  const handleCopy = (item) => {
    const textToCopy = `${item.title ? item.title : "Untitled"}\n\n${item.task}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Task copied to clipboard!")
      setOpenMenuId(null)
    }).catch(() => {
      alert("Failed to copy task")
    })
  }
  

  

  return (
    <>
        {parsedData && parsedData.map((item, index) => (
          <div key={index} className='h-fit border border-white rounded-xl bg-gray-800 shadow-lg flex-col break-inside-avoid mb-4'>
            <div className='w-full h-1/2 border-b border-gray-700 py-1 px-2 flex justify-between items-center relative'>
                <h3 className='text-left text-white font-medium text-md md:text-xl'>{item.title ? item.title : "Untitled"}</h3>
                <div 
                  ref={(el) => {
                    if (el) menuRefs.current[index] = el
                  }} 
                  className='relative'
                >
                  <EllipsisVertical 
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/50 p-1 rounded-full"
                    onClick={() => handleMenuToggle(index)}
                  />
                  
                  {/* Dropdown Menu */}
                  {openMenuId === index && (
                    <div className='absolute right-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-50'>
                      <button
                        onClick={() => handleCopy(item)}
                        className='w-full px-4 py-2 text-left text-white hover:bg-blue-500/20 rounded-t-lg transition-colors duration-150 flex items-center gap-2'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy
                      </button>
                      <div className='border-t border-gray-600'></div>
                      <button
                        onClick={() => handleEdit(index)}
                        className='w-full px-4 py-2 text-left text-white hover:bg-gray-600 transition-colors duration-150 flex items-center gap-2'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> Edit
                      </button>
                      <div className='border-t border-gray-600'></div>
                      <button
                        onClick={() => handleDelete(index)}
                        className='w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/20 rounded-b-lg transition-colors duration-150 flex items-center gap-2'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Delete
                      </button>
                    </div>
                  )}
                </div>
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