"use client"

import * as React from "react"
import { SVGProps } from "react"
import gsap from 'gsap'
import { RefObject, useEffect, useRef,useState } from "react";
import { useStateContext } from "@/StateManager";



const MenuSvg = (props: SVGProps<SVGSVGElement>) => {
    
let leftArrow = useRef(null)
let rightArrow = useRef(null)
let straightline1 = useRef(null)
let straightline2 = useRef(null)

const{menu,setMenu} = useStateContext()


const menuAnimation = () =>{
 gsap.to(straightline1.current,{opacity:!menu?0:1})
 gsap.to(straightline2.current,{rotate:!menu?"0":0,})
 gsap.to(leftArrow.current,{rotate:!menu?"100":6,opacity:!menu?1:0})
 gsap.to(rightArrow.current,{rotate:!menu?"10":45,opacity:!menu?1:0})


}

useEffect(()=>{
   
menuAnimation()
})
    
    
    return(
  <svg 

onClick={()=>{setMenu(!menu)}}
    xmlns="http://www.w3.org/2000/svg"
    width={"7vw"}
    height={"9vw"}
    fill="none"
    viewBox="0 0 382 403"
    {...props}
  >
    <g fill="#333D3E">
      <path ref={leftArrow} className="leftx_arrow opacity-0" d="M337.889 201.5 190.981 369.417 149.846 322.4 255.62 201.5 149.846 80.6l41.135-47.017 73.454 83.959 73.454 83.958Z" />
      <path ref={straightline1} className=" straigth_line " d="M.039 0v67.167H382V0H.039Z" />
      <path ref={rightArrow} className="rightx_arrow opacity-0" d="m41.94 201.5 146.908 167.917 41.134-47.017-105.774-120.9L229.982 80.6l-41.134-47.017-73.454 83.959L41.94 201.5Z" />
      <path  ref={straightline2} className="straigth_line " d="M.039 403v-67.167H382V403H.039ZM0 168.736v67.166h381.961v-67.166H0Z" />
    </g>
  </svg>
)}
export default MenuSvg
