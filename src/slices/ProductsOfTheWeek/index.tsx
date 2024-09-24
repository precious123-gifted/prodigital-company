"use client"

import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { MutableRefObject,Suspense, RefObject, useEffect, useRef, useState } from "react";
import gsap from 'gsap'
import Link from "next/link";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useStateContext } from "@/StateManager";
import Image from "next/image";
import displayElementWhenPageLoads from "@/animation-provider/animation";
import LoadingScreen from "./loading";
import Skeleton from 'react-loading-skeleton';




gsap.registerPlugin(ScrollTrigger);



/**
 * Props for `ProductsOfTheWeek`.
 */
export type ProductsOfTheWeekProps =  SliceComponentProps<Content.ProductsOfTheWeekSlice>;

/**
 * Component for "ProductsOfTheWeek" Slices.
 */
const Productsoftheweek = (
    // { slice }: ProductsOfTheWeekProps,
    {ProductsoftheweekData}:any): JSX.Element => {


//refs
const headerref = useRef(null)
type ProductRef = MutableRefObject<HTMLDivElement | null>;

const productrefs = useRef<ProductRef[]>([]);

const button = useRef(null)
const header = useRef(null)



const {fetchedData,setFetchedData} = useStateContext()




 

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
  opacityAnimation(headerref,0.4)

  productrefs.current.forEach((ref)=>{

    opacityAnimation(ref,0.6)

  })

})   









  return (
    
<Suspense fallback={<LoadingScreen/>}>
    <Bounded
    
   className="  text-[#333D3E] " 
    >
<div className="content w-full flex flex-col items-center pt-6  pb-[6vw] space-y-[8vw] portrait:space-y-[12vw]"> 

        <div ref={headerref} className="heading opacity-0 text-[3vw] portrait:sm:text-[4vw] portrait:text-[7vw] portrait:mb-10">Products of the Week</div>


<div className="section w-full ">


  
          
         

      

      <div className="space-y-16 flex flex-col items-center  ">
        <div   className="ProductsContainer w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20"> 
        {fetchedData.slice(0, 8).map((product:any,index:number) => (
          <div
            key={product._id}
            id={product._id}
            ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
            className="Product  landscape:hover:border-x-2 opacity-0 transition duration-200 ease-in
            landscape:hover:border-[#bad8d863]  w-auto flex flex-col items-center text-start  space-y-1"
          >
            <div className="flex flex-col items-start">
            <Link  href={`/product/${product._id}`}> 
              <div className="Image cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                <Image src={product?.productMainImage} alt={product.altText}  className="rounded-lg "   width={960} height={1280} />
              </div>
            </Link>
            <Link href={`/product/${product._id}`}> 
              <div className="Title w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{product.brandName}<span className="ml-1 text-[#4b6363] text-wrap">{product.title}</span></div></div>
            </Link>
            <div className="Description w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.shortDescription}</div>
            <div className="Prize w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
            </div>
          </div>
        ))}


      </div>

      <div className="btn-div  h-[8vw] portrait:h-[12vw] w-full flex justify-center items-center"> 
 <Link href={"/products"}> <div ref={button} className="button opacity-0 bg-[#333D3E] text-[#EBFEFF] cursor-pointer portrait:px-[22vw] px-[10vw] py-3 rounded-[0.280rem] text-[3vw] portrait:text-[8vw] hover:bg-[#252d2e] duration-[0.2s]  ease-in-out ">More Products</div> </Link> 
  
   </div>
      </div>
      </div>
      </div>
      </Bounded></Suspense>
      

  );
};

export default Productsoftheweek;
