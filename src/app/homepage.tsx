"use client"

import React, { useLayoutEffect} from 'react'
import SmoothScroller from '../smoothscroll'
import { animatePageIn } from '@/lib/animations'


export default function Homepage({Children}:any) {
 

  useLayoutEffect(() => {
    animatePageIn() 
  }, [])


  return (

    <>

   
   
       <SmoothScroller> 
        
    {Children}
       
    </SmoothScroller>
     
           

    
    </>
    
  )
}
