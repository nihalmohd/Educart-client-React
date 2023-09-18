import { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosIntance } from '../../../Api/config';


interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  courseLearning: string;
  courseIncludes: string;
  coursePrice: number;
  ThumbnailLocation: string;
  SelectedCategory: string;
  SelectedSubCategory: string;
  DemoVideoLocation: string;
  Class?: [{ classVideoLocation: string; classname: string; ClassDescription: string }];
  Mentorname: string;
  Status?: boolean;
}


const PaymentPaypal = () => {
  const { _id } = useParams();
  const [courseDetails, setCourseDetails] = useState<Course>();
  const [coursePrice, setcoursePrice] = useState<number>(1)
  const price=useRef(null)
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const PaypalButtonRef = useRef<HTMLDivElement>(null);

  console.log(courseDetails);
  console.log(coursePrice);

  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosIntance.get('/CourseDeatailsByid', {
          params: { _id },
        });
        console.log({response:response.data});
        
        const { FoundedCourseByid } = response.data;
        setCourseDetails(FoundedCourseByid);
        console.log({FoundedCourseByid}); 
        price.current=FoundedCourseByid?.coursePrice
        // setcoursePrice(price.current as unknown as number)

      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchData();
  }, [_id]);

  // useEffect(() => {
  //   setcoursePrice(courseDetails?.coursePrice as number)
  // }, [courseDetails]);

  const handleClickButton = () => {
    setShowPayPalButton(true);
    if (PaypalButtonRef.current) {
      PaypalButtonRef.current?.click();
    }
  };

  const HanldeCourse = async () => {
    console.log("halo");

    const { data } = await axiosIntance.post("/UpdateCouseid", { CourseId: _id })
    if (data) {
      const { UpdatedCourseId } = data
      console.log(UpdatedCourseId);
      if (UpdatedCourseId) {
        const { data } = await axiosIntance.post("/paymentDetails", { CourseId: _id, coursePrice:price })
        if (data) {
          const { createdPayments } = data
          if (createdPayments) {
            console.log(createdPayments);
            navigate('/Mycourses')
          }
        }
      }
    }
  }

  return ( 
    <div>
      <div className="w-full h-screen  flex justify-center items-center">
        <div className="w-1/2 h-96 bg-slate-300  border-2 border-black p-1 drop-shadow-2xl">
          <div className="w-full h-10  border-2 border-black flex justify-center items-center">
            <h1 className='font-bold text-xl text-black '>This is EduCart payment</h1>
          </div>
          <button className='bg-black w-full h-10 text-white text-lg font-bold flex justify-center items-center hover:bg-white hover:text-black hover:border-2 hover:border-black shadow-xl hover:scale-x-95 mt-3' onClick={() => handleClickButton()}>Pay Now</button>
          <button className='bg-black w-full h-10 text-white text-lg font-bold flex justify-center items-center hover:bg-white hover:text-black hover:border-2 hover:border-black shadow-xl hover:scale-x-95 mt-3' onClick={() => { navigate(`/showCourse/${_id}`) }}>Cancel Payment</button>
          <div className="w-full h-80 p-2 " style={{ display: showPayPalButton ? 'block' : 'none' }} ref={PaypalButtonRef}>
            <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENTID as string }}>
              <PayPalButtons style={{ layout: "horizontal" }}
                createOrder={(_data: any, actions: any) => {
                  return actions.order.create({
                   
                    purchase_units: [
                      {
                        amount: { 
                          value:price.current, 
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (_data: any, actions: any) => {
                  try {
                    await actions.order.capture();
                    await HanldeCourse();
                  } catch (error) {
                    console.error("Payment capture failed:", error);
                    // Handle the payment failure here, e.g., show an error message to the user
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPaypal;
