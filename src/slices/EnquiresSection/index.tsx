"use client"


import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import backgroundImage from "../../../public/enquirebackground.png"
import callIcon from "../../../public/callicon.png"

import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { InView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `EnquiresSection`.
 */
export type EnquiresSectionProps =
  SliceComponentProps<Content.EnquiresSectionSlice>;

/**
 * Component for "EnquiresSection" Slices.
 */
const EnquiresSection = ({ slice }: EnquiresSectionProps): JSX.Element => {
let phonenumber = slice.primary.phonenumber



const headerref = useRef(null)
const writeupref = useRef(null)


const opacityAnimation = (ref: RefObject<HTMLDivElement>, time: number,inView:boolean) => {
  
  gsap.to(ref.current, time, {
    opacity: inView? '100%':'0',
    scrub: 1,
    ease: "Power1.easeIn",
  });


};



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]  " >
   
  <div className=" content w-full  flex flex-col rounded-xl ">
  <div className="backgroundImage">
 
  <Image src={backgroundImage} alt="Background" className="h-[25vw] portrait:h-[40vw] aspect-[4/3] object-cover  rounded-t-lg"/> 

    </div>
<div  className="headersection bg-[#BF634C] pb-[4vw] pl-[4vw] space-y-6 landscape:pt-14  portrait:pt-6  h-full  flex flex-col items-start w-full">
<InView as="div" onChange={(inView, entry) => opacityAnimation(headerref,0.6,inView)}>

<div ref={headerref} className="header opacity-0 text-[4vw] portrait:text-[6vw]">For Enquires and any Computer Related Information Contact Us</div>
</InView>

<InView as="div" onChange={(inView, entry) => opacityAnimation(writeupref,0.6,inView)}>

<Link  href={`tel:${phonenumber}`} ><div ref={writeupref} className="writeup opacity-0 cursor-pointer text-[2.4vw] portrait:text-[5vw] flex items-center"><Image src={callIcon} alt="call-icon"/>{slice.primary.phonenumber}</div></Link>
</InView>

 
</div>



  </div>


  </Bounded>
    </section>
  );
};

export default EnquiresSection;
