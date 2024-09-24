"use client"

import React, { useEffect, useState } from 'react'
import Bounded from '../components/Bounded';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import backgroundImage from "../../../public/hero-background.png"
import backgroundImage2 from "../../../public/hero-background2.png"
import { useStateContext } from '@/StateManager';
import { useRouter } from 'next/navigation';

export default function LoginForm() {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigitalcompany.com.ng";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
     const loginUrl = `/api/login`;




     const {displayPopUp,setDisplayPopUp} = useStateContext() 
     const {popupType,setPopupType} = useStateContext() 
     const {popupMessage,setPopupMessage} = useStateContext() 
  
    const [isAuthenticated, setIsAuthenticated] = useState(
      false
    );
  
  

 
 

 
const router = useRouter()
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();



      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const userName = formData.get('userName');
      const password = formData.get('password');



      const loginData = { userName, password };


      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        });


        if (response.status === 200) {
          const data = await response.json();
          setDisplayPopUp(true)
          setPopupMessage('Logged in Successfully')
          setPopupType('success')
          console.log('Logged in successfully as Admin:');
setTimeout(() => {
  router.refresh()  
}, 3000);

        } 
        else if(response.status === 201){
            setPopupType('success')
            setDisplayPopUp(true)
            setPopupMessage('Admin Account Created Successfully')
            setTimeout(() => {
                setPopupType('success')
                setDisplayPopUp(true)
                setPopupMessage('You can now Login with Your Admin Credentials')
            }, 3000); 
        }
        
        else if (response.status === 401) {
            setDisplayPopUp(true)
            setPopupMessage('Invalid User Name or Password')
            setPopupType('warning')
          console.error('Server responded with conflict (401):', response.statusText);
        } else {

          console.error('Server responded with error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };



  return (
    <>
    <ToastContainer/>
    
      <Bounded
       className="  text-[#333D3E] portrait:text-[#E7FEFF]  " >
    
       
      <div className=" content w-full h-full flex   justify-center items-center rounded-xl relative">
      <div className="backgroundImage ">
     
      <Image src={backgroundImage} alt="Background" className="portrait:hidden"/> 
      <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/> 
    
        </div>
    
    
        <form onSubmit={handleLogin} className='absolute h-full  flex flex-col items-center space-y-4 pt-[2vw] portrait:pt-[14vw]'>
    
    <input type="password" name='userName' placeholder='userName' className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'/>
    <input type="password" name='password'  placeholder='password' className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'/>
    
        <button type="submit" className='portrait:mt-[10vw] portrait:sm:mt-[8vw] px-[2vw] py-4 w-full bg-[#469c6a] hover:bg-[#172c20] transition duration-300 ease-in-out text-[#354e3f] hover:text-[#d0f7df] text-[1.6vw] portrait:text-[5.8vw]  rounded-md'>Login</button>
      </form>
    
    
      </div>
    
    
      </Bounded>
      </>
    
  )
}
