import React, { useState } from 'react'
import Addtask from './components/Addtask.jsx'
import Viewtask from './components/Viewtask.jsx'

const App = () => {
  const [editingTask, setEditingTask] = useState(null)

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 flex flex-col overflow-hidden">
        <Addtask editingTask={editingTask} setEditingTask={setEditingTask} />
        <Viewtask className="grow overflow-y-auto" setEditingTask={setEditingTask} />
      </div>
    </>
  )
}

export default App
