import React from 'react'
import Card from './Card'

const Viewtask = ({ className }) => {
  return (
    <div className={`text-white w-full h-full overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ${className}`}>
        <Card   />
    </div>
  )
}

export default Viewtask