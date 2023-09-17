import {PayPalScriptProvider,PayPalButtons,} from "@paypal/react-paypal-js";
import React from "react";


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



interface PayPalProps {
    course: Course,
    HanldeCourse: () => Promise<void>;
}



const PayPal: React.FC<PayPalProps> = ({ course, HanldeCourse }) => {
    console.log(course);
    
    return (
        <>
            <PayPalScriptProvider
                options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENTID as string }}
            >
                <PayPalButtons
                    style={{ layout: "horizontal" }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    createOrder={(_data: any, actions: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: course.coursePrice?course.coursePrice:"10.00",
                                    },
                                },
                            ],
                        });
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onApprove={(_data: any, actions: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        return actions.order.capture().then(async function () {
                            await HanldeCourse();
                        })
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .catch(function (error: any) {
                                console.log(error);

                            });
                    }}
                />
            </PayPalScriptProvider>
        </>
    );
};

export default PayPal;