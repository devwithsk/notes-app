import React, { useState, useEffect } from 'react'

const Addtask = ({ editingTask, setEditingTask }) => {

  const [isExpanded, setisExpanded] = useState(false)
  const [title, settitle] = useState("")
  const [task, settask] = useState("")

  // When editing task is set, populate the form
  useEffect(() => {
    if (editingTask !== null) {
      const data = JSON.parse(localStorage.getItem("tasks"))
      const taskData = data[editingTask]
      settitle(taskData.title)
      settask(taskData.task)
      setisExpanded(true)
    }
  }, [editingTask])

  const addTask = () => {
    if(task !== "") {      

      let data = localStorage.getItem("tasks")
      if(editingTask !== null) {
        // Update existing task
        let parsedData = JSON.parse(data)
        parsedData[editingTask] = {title, task}
        localStorage.setItem("tasks", JSON.stringify(parsedData))
        setEditingTask(null)
      } else {
        // Add new task
        if(data){
          let parsedData = JSON.parse(data)
          parsedData.push({title, task})
          localStorage.setItem("tasks", JSON.stringify(parsedData))
        }else{
          localStorage.setItem("tasks", JSON.stringify([{title, task}]))
        }
      }
      window.dispatchEvent(new Event("taskUpdated"))
    }else{
      alert("Please Add a task")
    }

    settitle("")
    settask("")
    setisExpanded(false)
  }

  const handleCancel = () => {
    settitle("")
    settask("")
    setisExpanded(false)
    setEditingTask(null)
  }

  return (
    <> 
      <div className={`w-full ${isExpanded ? 'h-full' : 'h-1/3'} flex justify-center items-center transition-all duration-500`}>
      
        {/* // expanded view */}
        {isExpanded ? (
        <div className='w-full md:w-1/2 px-4 md:px-0 h-full flex flex-col justify-center gap-4 transition-opacity duration-500'>
          <input type="text" placeholder="Title" className='bg-gray-800 w-full h-12 text-white border border-gray-700 text-sm md:text-2xl px-4 rounded focus:outline-none focus:ring-0' 
            value={title}
            onChange={e => settitle(e.target.value)}
          />

          <textarea name="task" id="task" placeholder="Add your task here..." className='bg-gray-800 w-full h-1/2 text-white border border-gray-700 p-2 text-sm md:text-xl rounded focus:outline-none focus:ring-0 resize-none overflow-y-auto'
            value={task}
            onChange={e => settask(e.target.value)}
          >
          </textarea>
          <div className='flex gap-2 justify-center md:justify-end'>
            <button onClick={handleCancel} className='bg-gray-700 text-white font-bold text-xl w-1/2 md:w-1/4 h-10 rounded shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300'>CANCEL</button>
            <button onClick={() => {setisExpanded(false); addTask();}} className='bg-white text-gray-900 font-bold text-xl w-1/2 md:w-1/4 h-10 rounded shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300'>{editingTask !== null ? "UPDATE" : "ADD TASK"}</button>
          </div>
        </div>
        ) : (

        // collapsed view
        <div className='w-full md:w-1/2 px-4 md:px-0  h-12 flex justify-center items-center transition-all duration-500'>
          <input type="text" value={title} placeholder="Add a new task..." className='bg-gray-800 w-full h-12 text-white border border-gray-700 text-sm md:text-2xl px-4 rounded focus:outline-none focus:ring-0' onClick={() => setisExpanded(true)} />
        </div>
        )}

        
      
      </div>
    </>
  )
}

export default Addtask