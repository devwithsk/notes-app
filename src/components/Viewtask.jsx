import React from 'react'
import Card from './Card'


const Viewtask = ({ className }) => {
  return (
    <div className={`text-white w-full h-full overflow-y-scroll columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 p-4 ${className}`}>
        <Card   />
    </div>
  )
}

export default Viewtask