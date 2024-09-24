"use client"

import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import backgroundImage from "../../../public/customer-satisfaction-background.png"
import Image from "next/image";
import { RefObject,useRef} from "react";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { InView} from "react-intersection-observer";



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


  const headerref = useRef<HTMLDivElement>(null);
  const writeupref = useRef(null)





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
   className="  text-[#D3E5E6]  " >
   
  <div className=" content w-full  flex   portrait:flex-col rounded-xl relative">
  <div className="backgroundImage">
 
  <Image src={backgroundImage} alt="Background" className="h-[40vw] portrait:h-[60vw] aspect-[4/3] object-cover  rounded-lg"/> 

    </div>
<div className="headersection space-y-6 landscape:pt-14  portrait:pt-6 absolute text-center h-full  flex flex-col items-center w-full">

<InView as="div" onChange={(inView, entry) => opacityAnimation(headerref,0.6,inView)}>
<div ref={headerref} className="header opacity-0 text-[4vw] portrait:text-[6vw]">{slice.primary.header}</div>
</InView>

<InView as="div" onChange={(inView, entry) => opacityAnimation(writeupref,0.6,inView)}>
<div ref={writeupref}  className="writeup opacity-0 text-[2vw] portrait:text-[4.3vw]">{slice.primary.writeup}</div>
</InView>

 
</div>



  </div>


  </Bounded>
  );
};

export default CustomerSatisfactionSection;
