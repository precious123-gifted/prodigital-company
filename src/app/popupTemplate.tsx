"use client"

import { useStateContext } from '@/StateManager';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function PopupTemplate() {


    const {displayPopUp,setDisplayPopUp} = useStateContext() 
    const {popupType,setPopupType} = useStateContext() 
    const {popupMessage,setPopupMessage} = useStateContext() 

const popUpDiv = useRef(null)

    let popUpAnimation = useEffect(()=>{

    if(displayPopUp)    gsap.to(popUpDiv.current,0.3, {
            marginTop: 0, 
            ease: "power3.out",
            onComplete: () => {
                setTimeout(() => {
                  gsap.to(popUpDiv.current, {
                    marginTop: '-100vw',  
                    ease:  "sine.in",
                  });
                
                  setDisplayPopUp(false)
              }, 2000);
            },
          });
    


    },[popupMessage,displayPopUp])


  return (
    <div className="overflow-hidden flex justify-center  fixed top-0 pt-3   w-[100vw] h-screen z-[100]  pointer-events-none">
      <div ref={popUpDiv} className={cn("popUpDiv rounded-md h-[4vw]   portrait:h-[16vw] px-[6vw]   mt-[-100vw] grid place-content-center text-[#e9e2e0] text-[1.1vw] portrait:text-[4vw] border-4 border-solid " ,popupType === 'success'?"bg-[#31503d] border-[#6ca180] " :"bg-[#4e5031] border-[#97a16c] ")}>
       {popupMessage}
      </div>
    </div>
  );
}