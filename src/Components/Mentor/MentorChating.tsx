
import { useEffect, useState } from "react"
import { axiosIntance } from "../../Api/config";



 interface message {
    User?:string
    Mentor?: String
    content: string;
    chat: string
  }

  interface mentor {

    Username:string;
    Email:string;
    Password:string;
    ProfileImage:string
  }
  
  export interface Chat {
    _id?:string
    UserId?:string
    MentorId?:[mentor]
    latestMessage?:string
  }
  
  interface ChatNavProps {
      selectdChat: Chat;
    }
     
    
    const MentorChating:React.FC<ChatNavProps> = ({selectdChat}) => { 
        const [content, setcontent] = useState<string>("")
        const [messages,Setmessages] = useState<message[]>()

        let Role =''   
        let UserId=''
        let MentorId=''
        const User = JSON.parse(localStorage.getItem("User") as any);
        if(User){
            console.log(User,"role is displayig");  
              const {logincheck} = User
              if(logincheck){
                  Role = logincheck?.role
                  UserId  =logincheck?._id
              }
               console.log(Role,'role is dispaying');  
        }else{
            const Mentor = JSON.parse(localStorage.getItem("Mentor")as any)
            const {Mentorlogincheck} = Mentor
            if(Mentorlogincheck){
                MentorId = Mentorlogincheck._id 
                Role = Mentorlogincheck?.role 
            }
             console.log(MentorId,"menor id is priting");
             
            }
            
            const chatId  = selectdChat._id
            console.log(chatId,"didint getting");
            
            const currentId = Role ==="User"?UserId :MentorId


useEffect(()=>{
    TakeMessages()
},[])



    const HandleClick =async () => { 
        if(content.trim().length>0){
            const {data} = await axiosIntance.post("/CreateMessage",{currentId,chatId,content,Role})
             console.log(data);  
             TakeMessages()
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            HandleClick()
        }
    };
    console.log(content);
    
    const TakeMessages =async () =>{
        const {data} = await axiosIntance.get("/FindingMessage",{params:{chatId}})
        console.log(data);
        if(data){
            const {FoundedMessages}=data
            Setmessages(FoundedMessages)   

        }
    }

    return (
        <div className='w-full h-full  mt-1 '>
            <h1>{Role}</h1>
            <h1>{MentorId}</h1>
            <h1>{content}</h1>
            <div className="w-full h-[440px] overflow-auto  border border-black  pb-1 6">
                <div className="w-full h-full ">
                    <div className="w-full h-full mt-1 ">
                        <div className="w-full h-full  flex justify-end mb-1 mt-1  gap-2 ">
                            <div className="h-[400px] w-full flex justify-end items-end  ">
                                <div className="w-full h-full ">
                                    <div className="w-1/2 h-fit  flex justify-start itmes-end mt-1 p-1">
                                        <div className="w-8 h-8 bg-red-200 rounded-full">
                                            <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                        </div>
                                        <div className="w-fit h-fit  bg-slate-200 rounded-r-xl rounded-b-xl ml-1 mt-5">
                                            <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>nialll is the one of the develper in kerela we can contact with him using his personl web app like its me nihal </h1>
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-fit  flex justify-start itmes-end mt-1 p-1">
                                      
                                        <div className="w-8 h-8 bg-red-200 rounded-full">
                                            <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                        </div>
                                        <div className="w-fit h-fit  bg-slate-200 rounded-r-xl rounded-b-xl ml-1 mt-5">
                                            <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>nialll </h1>
                                        </div>
                                    </div>
                                    <div className="w-full h-fit flex justify-start items-end   mt-1">
                                        <div className="w-1/2 h-fit  flex justify-start itmes-end mt-1 p-1">
                                            <div className="w-8 h-8 bg-red-200 rounded-full">
                                                <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                            </div>
                                            <div className="w-fit h-fit  bg-slate-200 rounded-r-xl rounded-b-xl ml-1 mt-5">
                                                <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>nialll </h1>
                                            </div>
                                        </div>
                                    </div>
                                    {

                                    <div className="w-full h-fit flex justify-end items-end mt-1">
                                        <div className="w-1/2 h-fit  flex gap-1 justify-end itmes-end mt-1 p-1 ">
                                            <div className="w-fit h-fit  bg-slate-200 rounded-s-xl rounded-b-xl ml-1 mt-5">
                                                <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>nialll </h1>
                                            </div>
                                            <div className="w-8 h-8 bg-red-200 rounded-full">
                                                <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    
                                    <div>
                                    {
                                            Role==="Mentor"?(
                                                messages?.map((items)=>(

                                    <div className="w-full h-fit flex justify-end items-end mt-1">
                                        <div className="w-1/2 h-fit  flex gap-1 justify-end itmes-end mt-1 p-1 ">
                                            <div className="w-fit h-fit  bg-slate-200 rounded-s-xl rounded-b-xl ml-1 mt-5">
                                                <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>{items.content} </h1>
                                            </div>
                                            <div className="w-8 h-8 bg-red-200 rounded-full">
                                                <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                            </div>
                                        </div>
                                    </div>
                                                ))  
                                            ):(<></>)
                                        }
                                    </div>

                                    <div className="w-full h-fit flex justify-start items-end    mt-1">
                                        <div className="w-1/2 h-fit  flex justify-start itmes-end ml-1 p-1">
                                            <div className="w-8 h-8 bg-red-200 rounded-full">
                                                <img src="https://res.cloudinary.com/dgb07yvbv/image/upload/v1694102277/uibg2w6q56ybr77bgotd.png" className='w-full h-full object-cover' alt="no img" />
                                            </div>
                                            <div className="w-fit h-fit  bg-slate-200 rounded-r-xl rounded-b-xl ml-1 mt-5">
                                                <h1 className='font-semibold text-lg text-gray-500 p-2 m-1'>nialll is the one of the develper in kerela we can contact with him using his personl web app like its me nihal </h1>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-16  flex justify-center items-center gap-2">
                <input onChange={(e) => { setcontent(e.target.value) }} type="text" className='w-11/12 h-10 bg-white rounded-lg border border-black p-2' placeholder='Insert your message here' />
                <button onKeyDown={handleKeyDown} onClick={() => HandleClick()} className='w-1/12 h-10 bg-black text-white  hover: border hover:bg-transparent hover:text-black  rounded-lg hover:border-black mr-1 hover:translate-x-0' >Send</button>
            </div>
        </div>
    )
}

export default MentorChating