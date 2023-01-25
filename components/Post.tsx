import React from 'react'
import { AiOutlinePause } from 'react-icons/ai'

const Post = () => {
  return (
    <div className="w-[88%] left-[6%] h-36 bg-white flex">
      {/* Art/Controls */}
      <div className="w-[30%] h-[69%] bg-slate-400 flex justify-center items-center">
        <AiOutlinePause size={50}/>
      </div>

      {/* Info/Progress */}
      <div className="flex-col w-[70%] h-full">
        <div className="h-[60%]">
          <h2 className="p-2 text-xl">
            Orange Song
          </h2>
          <h3 className="p-2 pt-0 pb-1 text-lg">      
            Lil Citrus
          </h3>
        </div>
        <div className="bg-slate-200 h-[40%]">
          <button>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post