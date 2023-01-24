import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'

const NavBar = () => {
  return (
    <div className="fixed h-16 w-full bg-white z-10">
      <div className="max-w-[1240px] h-full m-auto flex justify-between items-center">

        {/* logo */}
        <div className="w-[90px] h-[32px] relative m-2">
          <Link href="/" className="m-0">
            <Image 
              src="/logo.png"
              alt="POLP Logo"
              fill
            />
          </Link> 
        </div>
        
        {/* search bar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-half z-20 h-full items-center">
          <input 
            className="bg-cream w-full translate-y-5"
            placeholder='search...'
          />
        </div>

        {/* Menu */}
        <button className="m-6">
          <AiOutlineMenu size={20} />
        </button>
      </div>
    </div>
  )
}

export default NavBar