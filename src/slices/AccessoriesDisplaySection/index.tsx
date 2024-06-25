"use client"


import { Content} from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import Image from "next/image";
import chargerIcon from "../../../public/charger.png"
import mouseIcon from "../../../public/gaming-mouse.png"
import bagIcon from "../../../public/bag.png"
import harddriveIcon from "../../../public/external-hard-drive.png"
import Link from "next/link";
import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



/**
 * Props for `AccessoriesDisplaySection`.
 */
export type AccessoriesDisplaySectionProps =
  SliceComponentProps<Content.AccessoriesDisplaySectionSlice>;




/**
 * Component for "AccessoriesDisplaySection" Slices.
 */
const AccessoriesDisplaySection = ({
  slice,
}: AccessoriesDisplaySectionProps): JSX.Element => {

  type IconRef = MutableRefObject<HTMLDivElement | null>;


  const iconrefs = useRef<IconRef[]>([]);
  const headerref = useRef(null)
  const header2ref = useRef(null)

  const writeupref = useRef(null)
  const writeup2ref = useRef(null)
  const buttonref = useRef(null)


  const icons = [
    {
      name: 'Chargers',
      icon: chargerIcon, // Assuming chargerIcon is an image source
      className: 'chargerdiv flex flex-col items-center opacity-0',
    },
    {
      name: 'Gaming Mouse',
      icon: mouseIcon,
      className: 'mousediv flex flex-col items-center opacity-0',
    },
    {
      name: 'L-Bags',
      icon: bagIcon,
      className: 'bagdiv flex flex-col items-center opacity-0',
    },
    {
      name: 'HDD/SSD',
      icon: harddriveIcon,
      className: 'harddrivediv flex flex-col items-center opacity-0',
    },
  ];
  



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
    opacityAnimation(headerref,0.6)
    opacityAnimation(writeupref,0.8)

  

    iconrefs.current.forEach((ref)=>{
  
      opacityAnimation(ref,0.8)
  
    })

    opacityAnimation(header2ref,0.6)
    opacityAnimation(writeup2ref,0.8)
    opacityAnimation(buttonref,0.8)


  
  }) 



  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]" >
   
  <div className=" content w-full   flex  flex-col  portrait:flex-col  ">
 
<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<div ref={headerref} className="opacity-0 header text-[4vw] portrait:text-[6vw]">{slice.primary.question}</div>
<div ref={writeupref} className="opacity-0 writeup text-[2vw] portrait:text-[4vw]">{slice.primary.writeup}</div>

</div>

<div className="displaysection  bg-[#4C6E72] flex flex-col items-center pb-[6vw]  portrait:pb-[10vw]">
<div ref={header2ref} className="header opacity-0 text-[2vw]  portrait:text-[4.8vw] pt-[2vw] mb-[4vw] portrait:mb-[14vw] portrait:pt-[10vw]">We Sell</div>
<div className="iconsdisplaysection pb-[4vw] portrait:pb-[10vw] w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20 ">
{icons.map((item, index) => (
        <div key={index} 
        ref={iconrefs.current[index] = React.createRef<HTMLDivElement>()}
        className="flex flex-col justify-center items-center"

        >
          <Image src={item.icon} alt={item.name} className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit" />
          <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">{item.name}</div>
        </div>
      ))}

</div>

<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<div ref={writeup2ref} className="header opacity-0 text-[4vw] portrait:text-[6vw]">To See more of Our Accessories <br/>click on the Button</div>
<div ref={buttonref} className="btn-div  opacity-0 pt-[4vw]  w-full flex justify-center items-center"> 
 <Link href={"/products/accessories"}> <div  className="button opacity-1 bg-[#EBFEFF] text-[#333D3E] cursor-pointer px-8 py-3 rounded-[0.280rem] text-[2vw] portrait:text-[8vw] hover:bg-[#d1f1f3] duration-[0.2s]  ease-in-out ">Check Our Accessories</div> </Link> 
  
   </div>

</div>

</div>

  </div>


  </Bounded>
  );
};

export default AccessoriesDisplaySection;
