import { Content} from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import Image from "next/image";
import chargerIcon from "../../../public/charger.png"
import mouseIcon from "../../../public/gaming-mouse.png"
import bagIcon from "../../../public/bag.png"
import harddriveIcon from "../../../public/external-hard-drive.png"
import Link from "next/link";




/**
 * Props for `AccessoriesDisplaySection`.
 */
export type AccessoriesDisplaySectionProps =
  SliceComponentProps<Content.AccessoriesDisplaySectionSlice>;




/**
 * Component for "AccessoriesDisplaySection" Slices.
 */
const AccessoriesDisplaySection = ({
  slice,
}: AccessoriesDisplaySectionProps): JSX.Element => {





  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]" >
   
  <div className=" content w-full   flex  flex-col  portrait:flex-col  ">
 
<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<div className="header text-[4vw] portrait:text-[6vw]">{slice.primary.question}</div>
<div className="writeup text-[2vw] portrait:text-[4vw]">{slice.primary.writeup}</div>

</div>

<div className="displaysection  bg-[#4C6E72] flex flex-col items-center pb-[6vw]  portrait:pb-[10vw]">
<div className="header text-[2vw]  portrait:text-[4.8vw] pt-[2vw] mb-[4vw] portrait:mb-[10vw]">We Sell</div>
<div className="iconsdisplaysection pb-[4vw] w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20 ">
<div className="chargerdiv  flex flex-col items-center">
  <Image src={chargerIcon} alt="laptop charger" className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit"/>
  <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">Chargers</div>
</div>

<div className="mousediv  flex flex-col items-center">
  <Image src={mouseIcon} alt="laptop charger" className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit"/>
  <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">Gaming Mouse</div>
</div>

<div className="bagdiv  flex flex-col items-center">
  <Image src={bagIcon} alt="laptop charger" className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit"/>
  <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">L-Bags</div>
</div>

<div className="harddrivediv  flex flex-col items-center">
  <Image src={harddriveIcon} alt="laptop charger" className="cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-fit"/>
  <div className="title text-[2vw] portrait:text-[4vw] pt-[2vw]">HDD/SSD</div>
</div>

</div>

<div className="headersection rounded-top-xl  bg-[#333D3E] pb-[6vw] space-y-6 landscape:pt-14  portrait:pt-6  text-center h-full  flex flex-col items-center w-full">
<div className="header text-[4vw] portrait:text-[6vw]">To See more of Our Accessories <br/>click on the Button</div>
<div className="btn-div pt-[4vw]  w-full flex justify-center items-center"> 
 <Link href={"/products/accessories"}> <div  className="button opacity-1 bg-[#EBFEFF] text-[#333D3E] cursor-pointer px-8 py-3 rounded-[0.280rem] text-[2vw] portrait:text-[8vw] hover:bg-[#d1f1f3] duration-[0.2s]  ease-in-out ">Check Our Accessories</div> </Link> 
  
   </div>

</div>






</div>



  </div>


  </Bounded>
  );
};

export default AccessoriesDisplaySection;
