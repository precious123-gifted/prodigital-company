"use client"

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import { MouseEvent, TouchEvent, useEffect } from 'react';
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


export default function HeaderContent({settings}: any) {

  interface forString{

    label: any,
    link: any
    index:number
  }

  const {cartLength,setCartLength} = useStateContext() 


  const [Icon,setIcon] = useState(true)

  const menuslide = useRef(null)
  const menuslidebackground = useRef<HTMLDivElement | null>(null)
  const links = useRef(null)
  const desktoplinks = useRef(null)
  const exiticon = useRef(null)
  const menuicon = useRef(null)
  const logo = useRef(null)
  const carticon = useRef(null)
  const desktopcarticon = useRef(null)
  const itemquantitydiv = useRef(null)




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



  const showMenu = () =>{
  
 setIcon(!Icon)
 Icon?gsap.to(exiticon.current,{opacity:1,duration:1,position:"fixed"}):gsap.to(exiticon.current,{})

 Icon?gsap.to(links.current,{marginLeft:0,duration:1}):gsap.to(links.current,{marginLeft:"100vw"})
 Icon?gsap.to(menuslide.current,{opacity:1,duration:1,position:"fixed",display:"unset",}):gsap.to(menuslide.current,{opacity:0,display:"none",})
 Icon?gsap.to(menuslidebackground.current,{opacity:"98%",duration:0.7,position:"fixed",display:"unset",}):gsap.to(menuslidebackground.current,{opacity:"0%",display:"none",})



  }




  return (
    <>
       <div className="content w-[95%]  flex flex-row justify-between items-center relative pt-2">
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

{settings.data.navigations.map(({link,label,index}:forString)=>(
<li  key={index}>
<PrismicNextLink  className="  hover:border-y-2 active:border-y-2 active:border-[#3b5252] border-[#3b5252] duration-[0.1s] ease-in-out" field={link}>{label}</PrismicNextLink>

</li>

))}

</ul>

<div   className="carticon  cursor-pointer relative">
<div ref={itemquantitydiv} className="itemQuantity opacity-0 text-[1vw] p-[0.1vw] w-6 bg-[#31503d] text-[#E2CABE] text-center rounded-full absolute top-[-1.4rem]">{cartLength}</div>
<Link href={"/cart"} >
  <Image  src={cartIcon} alt="cart icon"  ref={desktopcarticon} className="object-contain opacity-0 w-[2.5vw]"/>
  </Link>
</div>

</div>



  </div>



  <div ref={menuslidebackground} className="menuslidebackground  absolute  z-10 touch-none bg-[#47443F] hidden  h-full w-full"></div>

  <div ref={menuslide} className="menuslide opacity-0 landscape:hidden hidden w-[50%] h-auto  text-[6vw] portrait:sm:text-[5vw] text-[#3a5050]  pt-[9vw] portrait:sm:pt-[6vw] pb-[5vw] absolute z-20 ">
<div className="content w-full ">

<div ref={links} className="links  w-full  ml-[100vw] flex flex-col justify-between items-start space-y-6 portrait:sm:space-y-8">
<ul className=" space-y-4 portrait:sm:space-y-6">

{settings.data.navigations.map(({link,label,index}:forString)=>(
<li  key={index} className="bg-[#E2CABE] p-2 rounded-sm">
<PrismicNextLink field={link}>{label}</PrismicNextLink>

</li>

))}

</ul>


</div>

</div>

</div>


    </>
  )
}
