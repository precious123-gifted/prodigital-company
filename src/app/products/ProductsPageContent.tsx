"use client"

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef } from "react";
import gsap from "gsap";






export default function ProductsPageContent({newlaptops}: any) {


  interface forString{

    label: any,
    link: any
    index:number
  }



  type ProductRef = MutableRefObject<HTMLDivElement | null>;

const productrefs = useRef<ProductRef[]>([]);


const microActionOnProductClick = (productRef: ProductRef) =>{

  if(productRef.current)
  gsap.to(productRef.current,{width: "10vw"})
  
  
  
  
  }



 
useEffect(()=>{

console.log(newlaptops)

})




  return (
      
    <div>
    {newlaptops.map((newlaptop:any,index:number) => (
          <div
            key={newlaptop._id}
            id={newlaptop._id}
            ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
            onClick={()=>{microActionOnProductClick(productrefs.current[index])}}
            className="laptopProduct  hover:border-x-2
            landscape:hover:border-[#bad8d863] duration-[0.2s]  ease-in-out w-auto flex flex-col items-center text-start  space-y-1"
          >
            <Link  href={`/product/${newlaptop._id}`}> 
              <div className="laptopImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                <PrismicNextImage field={newlaptop.product.mainimage} className="rounded-lg " />
              </div>
            </Link>
            <Link href={`/product/${newlaptop._id}`}> 
              <div className="laptopTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw]">{newlaptop.product.title}</div>
            </Link>
            <div className="laptopDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{newlaptop.product.shortdescription}</div>
            <div className="laptopPrice w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{newlaptop.product.price}</div>
          </div>
        ))}
      </div>
      
  )
}
