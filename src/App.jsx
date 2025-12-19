import React from 'react'
import Addtask from './components/Addtask.jsx'
import Viewtask from './components/Viewtask.jsx'

const App = () => {

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 flex-col">
        <Addtask />
        <Viewtask className="grow" />
      </div>
    </>
  )
}

export default App
