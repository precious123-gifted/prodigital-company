"use client"

import { animatePageIn } from "@/lib/animations"
import {useLayoutEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    animatePageIn() 
  }, [])
  return (
    <div >
<div id="banner-container" className="overlow-hidden fixed top-0 left-0 w-screen h-screen z-50">

      <div
        id="banner-1"
        className="min-h-screen bg-[#ebfeff] z-10  absolute top-0 left-0 w-1/4"
      ></div>
      <div
        id="banner-2"
        className="min-h-screen bg-[#ebfeff] z-10 absolute top-0 left-1/4 w-1/4"
      ></div>
      <div
        id="banner-3"
        className="min-h-screen bg-[#ebfeff] z-10 absolute top-0 left-2/4 w-1/4"
      ></div>
      <div
        id="banner-4"
        className="min-h-screen bg-[#ebfeff] z-10 absolute top-0 left-3/4 w-1/4"
      ></div>
      </div>
      {children}
    </div>
  )
}
