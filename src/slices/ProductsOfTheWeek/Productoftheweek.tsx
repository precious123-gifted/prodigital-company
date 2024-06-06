"use client"

import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { ProductsOfTheWeekSlice } from '../../../prismicio-types';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



/**
 * Props for `ProductsOfTheWeek`.
 */
export type ProductsOfTheWeekProps =
  SliceComponentProps<Content.ProductsOfTheWeekSlice>;

/**
 * Component for "ProductsOfTheWeek" Slices.
 */
const Productsoftheweek = (
    // { slice }: ProductsOfTheWeekProps,
    {ProductsoftheweekData}:any,{slice}:any): JSX.Element => {


//refs
const headerref = useRef(null)
type ProductRef = MutableRefObject<HTMLDivElement | null>;

const productrefs = useRef<ProductRef[]>([]);




     
   
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

const microActionOnProductClick = (productRef: ProductRef) =>{

if(productRef.current)
gsap.to(productRef.current,{width: "10vw"})




}

useEffect(()=>{
  opacityAnimation(headerref,0.4)

  productrefs.current.forEach((ref)=>{

    opacityAnimation(ref,0.8)

  })




 
  


})   




  return (
    <Bounded
    // data-slice-type={slice.slice_type}
    // data-slice-variation={slice.variation}
   className="  text-[#333D3E] " 
    >
<div className="content w-full flex flex-col items-center pt-6  pb-[6vw] space-y-[8vw] portrait:space-y-[12vw]"> 

        <div ref={headerref} className="heading opacity-0 text-[3vw] portrait:sm:text-[4vw] portrait:text-[7vw] portrait:mb-10">Products of the Week</div>


<div className="hairsection w-full ">


  
          
         

      

      <div className="space-y-16 flex flex-col items-center  ">
        <div   className="hairProductsContainer w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20"> 
        {ProductsoftheweekData.map((product:any,index:number) => (
          <div
            key={product._id}
            id={product._id}
            ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
            onClick={()=>{microActionOnProductClick(productrefs.current[index])}}
            className="hairProduct  landscape:hover:border-x-2
            landscape:hover:border-[#bad8d863] duration-[0.2s]  ease-in-out w-auto flex flex-col items-center text-start  space-y-1"
          >
            <Link  href={`/product/${product._id}`}> 
              <div className="hairImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                <PrismicNextImage field={product.product.mainimage} className="rounded-lg " />
              </div>
            </Link>
            <Link href={`/product/${product._id}`}> 
              <div className="hairTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw]">{product.product.title}</div>
            </Link>
            <div className="hairDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.product.shortdescription}</div>
            <div className="hairPrize w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.product.price}</div>
          </div>
        ))}


      </div>
      
      </div>
      </div>
      </div>
      </Bounded>
  );
};

export default Productsoftheweek;
