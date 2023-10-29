import React from 'react'
import LoginForn from './LoginForm'
import LoginAuthButtons from './LoginAuthButtons'

const LoginFormImage = () => {
  return (
    <div className=" w-full h-full overflow-x-hidden ">
      <div className="flex flex-col justify-center ">
        <div className="w-full h-20 sm:h-14 flex justify-between border shadow-lg border-b bg-white " >
          <img className=" h-full " src="\Images\Untitled-1-01.png" alt="" />
        </div>
      </div>
      <div className="w-full h-full bg-vilot-200 flex p-2">
        <div className=" sm:hidden md:w-1/2 md:h-full md:flex  md:justify-center md:items-center " >
          <div className="md:flex w-full h-full justify-center items-center  ">
            <img src="\Images\441-removebg-preview.png" alt="" />
          </div>
        </div>
          <div className="sm:w-full md:w-1/2  flex justify-center items-center ">
            <LoginAuthButtons />

          </div>
      </div>
    </div>
  )
}

export default LoginFormImage