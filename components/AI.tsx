import React from 'react'
import { BsStars } from 'react-icons/bs'
import { IoSendSharp } from "react-icons/io5";

export default function AI() {
  return (
        <div className="bg-background border border-border drop-shadow-xl flex justify-center items-center w-96 py-4 px-6 rounded-full gap-2">
            <BsStars className="text-[#7c7c7c]" />
            <input
                placeholder="Ask me anything"
                className="text-primary bg-transparent outline-none w-full"
/*                 value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} */
                />
            <button /* onClick={handleSubmit} */>
              <IoSendSharp className="text-primary hover:scale-125 transition duration-200" />  
            </button>
    </div>
  )
}
