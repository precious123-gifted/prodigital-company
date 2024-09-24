"use client"

import React, { useEffect, useState } from 'react'
import Bounded from '../components/Bounded';
import Image from 'next/image';
import backgroundImage from "../../../public/hero-background.png"
import backgroundImage2 from "../../../public/hero-background2.png"
import { ToastContainer, toast } from "react-toastify";
import { PaystackButton } from 'react-paystack'





export default function CheckoutPage() {


    const publicKey = "pk_test_b86ae07fa0ee4f965933f9e365fce8cf8e158399";
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [checkoutAmount, setCheckoutAmount] = useState(0);
  
    const componentProps = {
      email,
      amount: JSON.parse(checkoutAmount)  * 100,
      metadata: {
        name,
        phone,
      },
      publicKey,
      text: "Pay Now",
      onSuccess: () =>
        toast.success("Thanks for shopping with us,we are always at your service!!"),
    }


    useEffect(() => {
      const storedAmount = localStorage.getItem('checkoutamount');
      if (storedAmount) {
        setCheckoutAmount(parseInt(storedAmount, 10)); // Parse and convert to number
      }
    }, []);


  return (
   
  <Bounded
  className="  text-[#333D3E] portrait:text-[#E7FEFF]  " >
<ToastContainer/>
  
 <div className=" content w-full h-full flex   justify-center items-center rounded-xl relative">
 <div className="backgroundImage ">

 <Image src={backgroundImage} alt="Background" className="portrait:hidden"/> 
 <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/> 

   </div>


   <div  className='absolute h-full  flex flex-col items-center space-y-4 pt-[0.6vw] portrait:pt-[14vw]'>

 
   <input type="email" placeholder="Email" className='outline-none h-[3vw] w-[30vw] portrait:w-[80vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
   <input type="text" placeholder="Name" className='outline-none h-[3vw] w-[30vw] portrait:w-[80vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  value={name} onChange={(e) => setName(e.target.value)} />
   <input type="number" placeholder="Phone number" className='outline-none h-[3vw] w-[30vw] portrait:w-[80vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  value={phone} onChange={(e) => setPhone(e.target.value)} />
   <input type="text"  className='outline-none h-[3vw] w-[30vw] portrait:w-[80vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  value={checkoutAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}  />

        <PaystackButton   className='portrait:mt-[10vw] portrait:sm:mt-[8vw] px-[2vw] py-4 w-full bg-[#469c6a] hover:bg-[#172c20] transition duration-300 ease-in-out text-[#354e3f] hover:text-[#d0f7df] text-[1.6vw] portrait:text-[5.8vw]  rounded-md' {...componentProps}/>
 
 </div>


 </div>


 </Bounded>
  )
}
