import SignInForm from "./Authbuttons"



const SignInImage = () => {
  return (
    <div className="w-full  h-full ">
      <div className=" flex flex-col justify-center ">
        <div className="w-full h-20 sm:h-14 flex justify-between border shadow-lg border-b bg-white ">
          <img className=" h-full " src="\Images\Untitled-1-01.png" alt="" />
        </div>
      </div>
      <div className="w-full h-full flex">
        <div className="sm:hidden md:w-1/2 md:h-full md:flex  ">
          <div className="sm:hidden md:flex md:w-fit md:h-fit md:justify-center md:items-center p-4">
            <img src="Images\elementary-school-student-boy-studying-online-vector-35332261.jpg" alt="" />
          </div>
        </div>

        <div className=" sm:w-full sm:flex sm:justify-center sm:items-center  md:w-1/2 md:flex md:justify-center md:items-center">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default SignInImage 