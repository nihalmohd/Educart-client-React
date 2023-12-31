import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosIntance } from '../../../Api/config'
import {GiRoundStar} from "react-icons/gi"

interface Course {
  _id:string
  courseTitle: string;
  courseDescription: string;
  courseLearning: string
  courseIncludes: string
  coursePrice: number;
  ThumbnailLocation: string;
  SelectedCategory: string;
  SelectedSubCategory: string;
  DemoVideoLocation: string;
  Class?: [{ classVideoLocation: string, classname: string, ClassDescription: string }];
  Mentorname:string;
  Status?: boolean;
  // User ?: [string];
  // stud ?: [{id:string,date:Date,month:string,fees:number}]
  // paymentStatus ?: boolean;
}



const CourseDisplay = () => {
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course[]>()
  useEffect(() => {
    DisplayCourse()
  }, [])

  const DisplayCourse = async () => {
    const { data } = await axiosIntance.get("/showCourse")
    console.log(data);
    if (data) {
      const { Getcourse } = data
      setCourse(Getcourse)
    }
  }
  return (
    <div className='p-2'>
      <div className="w-full h-full bg-slate-200 rounded-lg p-2 felx justify-center items-center  ">
        <div className="w-full h-16 flex items-center p-2">
          <h1 className='text-2xl font-serif font-bold underline'>Educart All Courses </h1>
        </div>
        <div className="w-full h-full p-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-5 gap-2">
        {
          course?.map((items) => (
            items.Status ?
           
                <div key={items._id} className="w-full h-[375px] bg-gray-400 p-2 hover:shadow-2xl hover:cursor-pointer hover:translate-x-1 hover:translate-y-2 " >
                  <div className="w-full h-full bg-slate-50 p-2">
                    <div className="w-full h-[125px] bg-green-200 border-2 border-black">
                      <img src={items.ThumbnailLocation} alt="" className='w-full h-full 'onClick={()=>navigate(`/showCourse/${items._id}`)} />
                    </div>
                    <div className="w-full h-14  mt-2 flex">
                      <h1 className='text-bas font-serif font-bold underline'>{items.courseTitle} </h1>
                    </div>
                    <div className="w-full h-8 mb-1 flex">
                      <div className='w-1/2 h-full  flex items-center'>
                      <GiRoundStar/>
                      <GiRoundStar/>
                      <GiRoundStar/>
                      <GiRoundStar/>
                      <GiRoundStar/>
                      </div>
                      <div className='w-1/2 h-8 flex items-center justify-center'>
                        <h1 className='text-xs font-semibold text-stone-500 text-start'>4.3</h1>
                      </div>
                    </div>
                    <div className="w-full h-5 flex items-center justify-start">
                      <h1 className='text-center font-semibold text-stone-500 text-xs'>Mr/Mrs:{items.Mentorname}</h1>
                    </div>
                    <div className="w-full h-10 flex justify-start items-center">
                      <h1 className='font-semibold text-lg text-black'>₹{items.coursePrice}</h1>
                    </div>
                    <div className='w-full h-16 p-1 flex gap-2'>
                      <button className='bg-black text-white w-full h-12 font-semibold text-lg hover:border-2 hover:border-black hover:bg-transparent hover:text-black 'onClick={()=>navigate(`/showCourse/${items._id}`)}>Buy now</button>
                      {/* <button className='bg-white border-2 border-black text-black w-1/3 h-12 font-semibold flex justify-center items-center text-xl hover:bg-black hover:text-white'><FaRegHeart/></button> */}
                    </div>
                  </div>
              </div> : null   
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default CourseDisplay