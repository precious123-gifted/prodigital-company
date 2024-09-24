"use client"

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import Link from "next/link";
import React, { MutableRefObject, RefObject, Suspense, useEffect, useRef, useTransition } from "react";
import gsap from "gsap";
import Bounded from "@/app/components/Bounded";
import Layout from "../navlayout";
import Image from "next/image";
import { useStateContext } from "@/StateManager";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import TransitionLink from "@/app/components/TransitionLink";
gsap.registerPlugin(ScrollTrigger);





export default function CategoryDataPage({products}: any) {


  

  interface forString{

    label: any,
    link: any
    index:number
  }



const {fetchedData,setFetchedData} = useStateContext()
const [isPending, startTransition] = useTransition();




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
  


useEffect(()=>{
  // startTransition(() => {
    setFetchedData(products)

  // })

},[])






useEffect(()=>{
  
  productrefs.current.forEach((ref)=>{

    opacityAnimation(ref,0.6)

  })

}) 


 





  return (
      <Bounded> 
        <Layout>
       
         <div className="w-full pb-[4vw] bg-[#EBFEFF] text-[#333D3E]">


<div className="w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20">
    {fetchedData.map((product:any,index:number) => (
          <div
            key={product._id}
            id={product._id}
            ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
            // onClick={()=>{microActionOnProductClick(productrefs.current[index])}}
            className="laptopProduct  hover:border-x-2opacity-0
transition duration-200 ease-in
            landscape:hover:border-[#bad8d863]   w-auto flex flex-col items-center text-start  space-y-1"
          >
            <TransitionLink  href={`/product/${product._id}`}> 
              <div className="laptopImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                <Image src={`${product.productMainImage}`} alt={product.altText}  width={960} height={1280} className="rounded-lg " />
                </div>
            </TransitionLink>
            <TransitionLink href={`/product/${product._id}`}> 
              <div className="laptopTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{product.brandName}<span className="ml-1 text-[#4b6363] text-wrap">{product.title}</span></div></div>
            </TransitionLink>
            <div className="laptopDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.shortDescription}</div>
            <div className="laptopPrice w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
          </div>
        ))}
      </div>
      </div>
      </Layout>

      </Bounded>
  
  )
}
