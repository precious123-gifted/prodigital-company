import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import backgroundImage from "../../../public/customer-satisfaction-background.png"
import Image from "next/image";
import Link from "next/link";

/**
 * Props for `CustomerSatisfactionSection`.
 */
export type CustomerSatisfactionSectionProps =
  SliceComponentProps<Content.CustomerSatisfactionSectionSlice>;

/**
 * Component for "CustomerSatisfactionSection" Slices.
 */
const CustomerSatisfactionSection = ({
  slice,
}: CustomerSatisfactionSectionProps): JSX.Element => {
  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]  " >
   
  <div className=" content w-full  flex   portrait:flex-col rounded-xl relative">
  <div className="backgroundImage">
 
  <Image src={backgroundImage} alt="Background" className="h-[40vw] aspect-[4/3] object-cover  rounded-lg"/> 
  {/* <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/>  */}

    </div>
<div className="headersection landscape:pt-14  portrait:pt-6 absolute text-center h-full  flex flex-col items-center w-full">
<div className="header text-[4vw] portrait:text-[6vw]">{slice.primary.header}</div>
<div className="writeup text-[2vw] portrait:text-[4vw]">{slice.primary.writeup}</div>

 
</div>



  </div>


  </Bounded>
  );
};

export default CustomerSatisfactionSection;
