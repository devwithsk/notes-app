import React from 'react'
import Addtask from './components/Addtask.jsx'
import Viewtask from './components/Viewtask.jsx'

const App = () => {

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 flex flex-col overflow-hidden">
        <Addtask />
        <Viewtask className="grow overflow-y-auto" />
      </div>
    </>
  )
}

export default App
