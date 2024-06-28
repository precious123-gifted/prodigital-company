"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

const pathname = usePathname()

const isProductsActive = pathname  === '/products'
const isUsedLaptopsActive = pathname  === '/products/UsedLaptops'
const isNewLaptopsActive = pathname  === '/products/NewLaptops'
const isAccessoriesActive = pathname  === '/products/Accessories'




  return (
    <>
    <div className="w-full flex mb-2 justify-between pb-[4vw]  portrait:pb-[10vw]  portrait:pt-[3vw] text-[1.4vw]  portrait:text-[3.2vw] portrait:sm:text-[3.4vw]">

      <Link href={"/products"} 
       className={cn(
        'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
         isProductsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb] shadow-lg'
      )}
      >
    All Products
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/NewLaptops' : '/products/NewLaptops'}
   className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isNewLaptopsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb] shadow-lg'
  )}
  >
    Opened Box/New Laptops
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/UsedLaptops' : '/products/UsedLaptops'} 
  className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isUsedLaptopsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb] shadow-lg'
  )}
  >
    Used Laptops
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/Accessories' : '/products/Accessories'} 
   className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isAccessoriesActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb] shadow-lg'
  )}
  >
    Accessories
  </Link>
</div>
    {children}
    </>
  )
}
