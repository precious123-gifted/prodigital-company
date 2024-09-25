"use client"

import displayElementWhenPageLoads from "@/animation-provider/animation";
import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import backgroundImage from "../../../public/hero-background.png"
import backgroundImage2 from "../../../public/hero-background2.png"
import TransitionLink from "@/app/components/TransitionLink";


/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */


const HeroSection = ({ slice }: HeroSectionProps): JSX.Element => {


  const button = useRef(null)
  const header = useRef(null)
  
  



  
  
    const loadingAnimation = useEffect(()=>{
  
      displayElementWhenPageLoads(button,0.5,450)
      displayElementWhenPageLoads(header,0.5,750)
    },[])


  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#333D3E] portrait:text-[#E7FEFF] portrait:pt-2 " >
   
  <div className=" content w-full  flex   portrait:flex-col rounded-xl relative">
  <div className="backgroundImage ">
 
  <Image src={backgroundImage} alt="Background" className="portrait:hidden"/> 
  <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/> 

    </div>
<div className="headersection absolute  h-full  flex flex-col items-center landscape:justify-between portrait:justify-center w-full">

    
    <div  className="btn-div  h-[40vw] w-full flex justify-center items-center"> 
 <TransitionLink href={"/products"}> <div ref={button} className="button opacity-0 bg-[#EBFEFF] text-[#333D3E] cursor-pointer px-8 py-3 rounded-[0.280rem] text-[2vw] portrait:text-[8vw] hover:bg-[#d1f1f3] duration-[0.8s]  ease-in-out ">Check Our Laptops</div> </TransitionLink> 
  
   </div>

   <div className="btn-div  h-[40vw] w-[90%] flex justify-center items-center"> 
<div ref={header} className="header1 opacity-0 text-[3vw]  portrait:text-[10vw] text-center leading-tight  tracking-free ">{slice.primary.herowriteup}</div>

</div>
</div>


  </div>


  </Bounded>
  );
};

export default HeroSection;
