"use client"

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import Bounded from "@/app/components/Bounded";
import Layout from "../navlayout";






export default function CategoryDataPage({products}: any) {


  

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

console.log(products)

})




  return (
      <Bounded> 
        <Layout>
                   <div className="w-full pb-[4vw] bg-[#EBFEFF] text-[#333D3E]">


<div className="w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20">
    {products.map((product:any,index:number) => (
          <div
            key={product._id}
            id={product._id}
            ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
            // onClick={()=>{microActionOnProductClick(productrefs.current[index])}}
            className="laptopProduct  hover:border-x-2
            landscape:hover:border-[#bad8d863] duration-[0.2s]  ease-in-out w-auto flex flex-col items-center text-start  space-y-1"
          >
            <Link  href={`/product/${product._id}`}> 
              <div className="laptopImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                <PrismicNextImage field={product.product.mainimage} className="rounded-lg " />
              </div>
            </Link>
            <Link href={`/product/${product._id}`}> 
              <div className="laptopTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{product.product.brandname}<span className="ml-1 text-[#4b6363] text-wrap">{product.product.title}</span></div></div>
            </Link>
            <div className="laptopDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.product.shortdescription}</div>
            <div className="laptopPrice w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.product.price}</div>
          </div>
        ))}
      </div>
      </div>
      </Layout>

      </Bounded>
  
  )
}
