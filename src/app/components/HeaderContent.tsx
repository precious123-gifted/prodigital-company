"use client"

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import React, { MouseEvent, MutableRefObject, TouchEvent, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import cartIcon from "../../../public/carticon.png";
import menuIcon from "../../../public/menuicon.png";
import exitIcon from "../../../public/exiticon.png"
import { useRef, useState } from "react";
import gsap from "gsap";
import { useStateContext } from "@/StateManager";
import displayElementWhenPageLoads from "@/animation-provider/animation";
import MenuSvg from "@/app/components/menuSvg"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import activeHomeLinkStyle from "./activeLinkStyle.module.scss"


export default function HeaderContent({settings}: any) {

  interface forString{

    label: any,
    link: any
    key:any
  }

  const {cartLength,setCartLength} = useStateContext() 


  const [Icon,setIcon] = useState(true)

  const menuslide = useRef(null)
  const menuslidebackground = useRef<HTMLDivElement | null>(null)
  const links = useRef(null)
  const menudiv = useRef(null)

  const desktoplinks = useRef(null)
  const exiticon = useRef(null)
  const menuicon = useRef(null)
  const logo = useRef(null)
  const carticon = useRef(null)
  const desktopcarticon = useRef(null)
  const itemquantitydiv = useRef(null)
  type ProductRef = MutableRefObject<HTMLDivElement | null>;

  const productrefs = useRef<ProductRef[]>([]);

  const pathname = usePathname();

const loadingAnimation = useEffect(()=>{

  displayElementWhenPageLoads(logo,0.5,150)
  displayElementWhenPageLoads(desktoplinks,0.5,300)
  displayElementWhenPageLoads(carticon,0.5,500)
  displayElementWhenPageLoads(desktopcarticon,0.5,400)
   displayElementWhenPageLoads(itemquantitydiv,0.5,420)
  displayElementWhenPageLoads(menuicon,0.5,650)
})








  useEffect(() => {
    const existingCartedProductsData = localStorage.getItem("cartedProducts");

    if (!existingCartedProductsData) {
      localStorage.setItem("cartedProducts", JSON.stringify([]));

    } else {
      setCartLength(JSON.parse(existingCartedProductsData).length);
    }
  }, []);




  const{menu,setMenu} = useStateContext()


const menuAnimation = () =>{
  

gsap.to(menudiv.current,{top:menu?"-30vw":"13vw",opacity:menu?0:1})


}

const menuBackAnimation = () =>{
  
setMenu(!menu)
  console.log(menu)
  
  }


useEffect(()=>{
  menuAnimation()
  console.log(pathname)
  
})





  return (
    <div className="w-[95%] portrait:flex-col portrait:flex">
       <div className="content w-full  flex flex-row justify-between items-center relative  pt-2">
<div ref={logo} className="logo opacity-0 cursor-pointer object-contain  w-[15vw] portrait:w-[32vw]  pb-1 ">
  <Link href={"/"}> <PrismicNextImage  field={settings.data.logo} /></Link>
      </div>


<div className="cartNmenuDiv landscape:hidden flex items-center  relative space-x-8 portrait:sm:space-x-14">
<div ref={carticon} className="carticon opacity-0 cursor-pointer object-contain relative  rounded-sm">
{ cartLength! > 0 && (<Link href={"/cart"}><div className="itemQuantity text-[3.5vw] portrait:sm:text-[2.5vw] p-[0.1vw]  w-5 portrait:sm:w-[4.4vw] bg-[#31503d] text-[#E2CABE] text-center rounded-full absolute top-[-1rem] ">{cartLength}</div></Link>)}
  <Link href={"/cart"}>
    <Image  src={cartIcon} alt="cart icon" className="w-[8vw] portrait:sm:w-[7vw]"/>
    </Link>
</div>

<div  className="icon ">

<div ref={menuicon} className=" menuicon opacity-0  landscape:hidden cursor-pointer object-contain  ">
<MenuSvg className=""/>

</div>

</div> 

</div>







<div ref={desktoplinks} className="links opacity-0  portrait:hidden w-auto space-x-[4vw] flex items-center ">
<ul  className=" flex justify-between w-[80%] text-[1.5vw] space-x-[6vw]">

{settings.data.navigations.map(({link,label,key}:forString)=>
{
  const isActive = pathname  === key 
  const isActiveChild = key !== '/' && pathname.includes(key)
const logic = !isActiveChild? isActive : isActiveChild

  return(
           
<div  key={key}
 >
<PrismicNextLink 

 className={cn(
  'px-3 py-2 rounded hover:bg-[#e0f3e6] ease-in-out text-[#385741] ',
   logic && 'bg-[#7fac8c] text-[#e8f7ed]'
)}
 field={link}>{label}</PrismicNextLink>

</div>

)})}

</ul>

<div   className="carticon  cursor-pointer relative">
<div ref={itemquantitydiv} className="itemQuantity opacity-0 text-[1vw] p-[0.1vw] w-6 bg-[#31503d] text-[#E2CABE] text-center rounded-full absolute top-[-1.4rem]">{cartLength}</div>
<Link href={"/cart"} >
  <Image  src={cartIcon} alt="cart icon"  ref={desktopcarticon} className="object-contain opacity-0 w-[2.5vw]"/>
  </Link>
</div>

</div>



  </div>



<div ref={menudiv} className="menu opacity-0 landscape:hidden w-full left-0 h-[24vw] bg-[#31503d] text-[#e9e2e0]   absolute z-50 top-[-30vw] flex justify-center items-center ">

<ul  className=" flex justify-between w-[80%] text-[6vw] space-x-[6vw]">

{settings.data.navigations.map(({link,label,key}:forString)=>
  
{
  const isActive = pathname  === key 
  const isActiveChild = key !== '/' && pathname.includes(key)
const logic = !isActiveChild? isActive : isActiveChild

  return(
<li
 
onClick={menuBackAnimation}
  key={key}>
<PrismicNextLink 
 className={cn(
  'px-3 py-2 rounded  ease-in-out text-[#d4e4d9] ',
   logic && 'bg-[#7fac8c] text-[#ebf8ef]'
)}

 field={link}>{label}</PrismicNextLink>

</li>

)})}

</ul>

</div>


    </div>
  )
}
