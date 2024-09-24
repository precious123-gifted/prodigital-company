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
import { InView } from "react-intersection-observer";
import TransitionLink from "@/app/components/TransitionLink";

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
      icon: chargerIcon, 
      className: 'chargerdiv flex flex-col items-center opacity-1',
    },
    {
      name: 'Gaming Mouse',
      icon: mouseIcon,
      className: 'mousediv flex flex-col items-center opacity-1',
    },
    {
      name: 'L-Bags',
      icon: bagIcon,
      className: 'bagdiv flex flex-col items-center opacity-1',
    },
    {
      name: 'HDD/SSD',
      icon: harddriveIcon,
      className: 'harddrivediv flex flex-col items-center opacity-1',
    },
  ];
  

  const opacityAnimation = (ref: RefObject<HTMLDivElement>, time: number,inView:boolean) => {
  
    gsap.to(ref.current, time, {
      opacity: inView? '100%':'0',
      scrub: 1,
      ease: "Power1.easeIn",
    });
  
 
  };

  




  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]" >
   
  <div className=" content w-full   flex  flex-col  portrait:flex-col  ">
 
<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<InView as="div" onChange={(inView, entry) => opacityAnimation(headerref,0.6,inView)}>

<div ref={headerref} className="opacity-0 header text-[4vw] portrait:text-[6vw]">{slice.primary.question}</div>
</InView>

<InView as="div" onChange={(inView, entry) => opacityAnimation(writeupref,0.6,inView)}>
<div ref={writeupref}  className="writeup opacity-0 text-[2vw] portrait:text-[4vw]">{slice.primary.writeup}</div>
</InView>
</div>

<div className="displaysection  bg-[#4C6E72] flex flex-col items-center pb-[6vw]  portrait:pb-[10vw]">
<InView as="div" onChange={(inView, entry) => opacityAnimation(header2ref,0.6,inView)}>
<div ref={header2ref} className="header opacity-0 text-[2vw]  portrait:text-[4.8vw] pt-[2vw] mb-[4vw] portrait:mb-[14vw] portrait:pt-[10vw]">We Sell</div>
</InView>

<div className="iconsdisplaysection pb-[4vw] portrait:pb-[10vw] w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20 ">


{icons.map((item, index) => (


        
<InView key={index} as="div" onChange={(inView) => opacityAnimation(iconrefs.current[index], 0.6, inView)}>
   <div key={index} 
        ref={iconrefs.current[index] = React.createRef<HTMLDivElement>()}
        className="flex flex-col justify-center items-center opacity-0"

        >
          <Image src={item.icon} alt={item.name} className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit" />
          <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">{item.name}</div>
        </div>
</InView>
       
       
      
        


      ))}

</div>

<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<InView as="div" onChange={(inView, entry) => opacityAnimation(writeup2ref,0.6,inView)}>

<div ref={writeup2ref} className="header opacity-0 text-[4vw] portrait:text-[6vw]">To See more of Our Accessories <br/>click on the Button</div>
</InView>

<InView as="div" onChange={(inView, entry) => opacityAnimation(buttonref,0.6,inView)}>

<div ref={buttonref} className="btn-div  opacity-0 pt-[4vw]  w-full flex justify-center items-center"> 
 <TransitionLink href={"/products/accessories"}> <div  className="button opacity-1 bg-[#EBFEFF] text-[#333D3E] cursor-pointer px-8 py-3 rounded-[0.280rem] text-[2vw] portrait:text-[8vw] hover:bg-[#d1f1f3] duration-[0.8s]  ease-in-out ">Check Our Accessories</div> </TransitionLink> 
  
   </div>
</InView>


</div>

</div>

  </div>


  </Bounded>
  );
};

export default AccessoriesDisplaySection;
