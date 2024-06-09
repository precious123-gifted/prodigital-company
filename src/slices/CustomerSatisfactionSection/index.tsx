"use client"

import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import backgroundImage from "../../../public/customer-satisfaction-background.png"
import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `CustomerSatisfactionSection`.
 */
export type CustomerSatisfactionSectionProps =
  SliceComponentProps<Content.CustomerSatisfactionSectionSlice>;

/**
 * Component for "CustomerSatisfactionSection" Slices.
 */
const CustomerSatisfactionSection = ({
  slice,
}: CustomerSatisfactionSectionProps): JSX.Element => {


  const header = useRef(null)
  const writeup = useRef(null)

  const opacityAnimation = (ref: RefObject<HTMLDivElement>,time:number) =>{
    let opacityAnimation =   ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      
      
        onEnter: () => {
        gsap.to(ref.current,time, {
          opacity:'100%',
          scrub:1,
          ease: "Power1.easeIn" ,
          
        });
    
      },
      onLeave: () => {
        gsap.to(ref.current,time, {
          opacity:'0%',
          scrub:1,
          ease: "Power1.easeIn" 
          
        });
    
    
       
        
      },
      onLeaveBack: () => {
        gsap.to(ref.current,time, {
          opacity:'0%',
          scrub:1,
          ease: "Power1.easeIn" 
          
        });
    
      
    
      },
      
      onEnterBack: () => {
        gsap.to(ref.current, time,{
          opacity:'100%',
          scrub:1,
          ease: "Power1.easeIn" 
         
        });
    
       
    
      },
    })
  }
  
  
  useEffect(()=>{
    opacityAnimation(header,0.4)
    opacityAnimation(writeup,0.8)
  
  
  })





  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]  " >
   
  <div className=" content w-full  flex   portrait:flex-col rounded-xl relative">
  <div className="backgroundImage">
 
  <Image src={backgroundImage} alt="Background" className="h-[40vw] portrait:h-[60vw] aspect-[4/3] object-cover  rounded-lg"/> 
  {/* <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/>  */}

    </div>
<div className="headersection space-y-6 landscape:pt-14  portrait:pt-6 absolute text-center h-full  flex flex-col items-center w-full">
<div ref={header} className="header opacity-0 text-[4vw] portrait:text-[6vw]">{slice.primary.header}</div>
<div ref={ writeup} className="writeup opacity-0 text-[2vw] portrait:text-[4.3vw]">{slice.primary.writeup}</div>

 
</div>



  </div>


  </Bounded>
  );
};

export default CustomerSatisfactionSection;
