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
const isUsedLaptopsActive = pathname  === '/products/usedLaptops'
const isNewLaptopsActive = pathname  === '/products/newLaptops'
const isAccessoriesActive = pathname  === '/products/accessories'




  return (
    <>
    <div className="w-full flex justify-between pb-[4vw]  portrait:pb-[10vw]  portrait:pt-[3vw] text-[1.4vw]  portrait:text-[3.2vw] portrait:sm:text-[3.4vw]">

      <Link href={"/products"} 
       className={cn(
        'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
         isProductsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb]'
      )}
      >
    All Products
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/newLaptops' : '/products/newLaptops'}
   className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isNewLaptopsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb]'
  )}
  >
    New Laptops
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/usedLaptops' : '/products/usedLaptops'} 
  className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isUsedLaptopsActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb]'
  )}
  >
    Used Laptops
  </Link>
  <Link href={pathname.includes('/products/') ? '/products/accessories' : '/products/accessories'} 
   className={cn(
    'px-3 py-2 rounded landscape:hover:bg-[#ddcbc2] ease-in-out text-[#665952] ',
     isAccessoriesActive && ' bg-[#bea192] landscape:hover:text-[#ddcbc2] text-[#f7efeb]'
  )}
  >
    Accessories
  </Link>
</div>
    {children}
    </>
  )
}
