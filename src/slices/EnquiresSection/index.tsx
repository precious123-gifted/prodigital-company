import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import backgroundImage from "../../../public/enquirebackground.png"
import callIcon from "../../../public/callicon.png"

import Image from "next/image";
/**
 * Props for `EnquiresSection`.
 */
export type EnquiresSectionProps =
  SliceComponentProps<Content.EnquiresSectionSlice>;

/**
 * Component for "EnquiresSection" Slices.
 */
const EnquiresSection = ({ slice }: EnquiresSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
   className="  text-[#D3E5E6]  " >
   
  <div className=" content w-full  flex flex-col rounded-xl ">
  <div className="backgroundImage">
 
  <Image src={backgroundImage} alt="Background" className="h-[25vw] portrait:h-[40vw] aspect-[4/3] object-cover  rounded-t-lg"/> 
  {/* <Image src={backgroundImage2} alt="Background" className="landscape:hidden"/>  */}

    </div>
<div className="headersection bg-[#BF634C] pb-[4vw] pl-[4vw] space-y-6 landscape:pt-14  portrait:pt-6  h-full  flex flex-col items-start w-full">
<div className="header text-[4vw] portrait:text-[6vw]">For Enquires and any Computer Related Information Contact Us</div>
<div className="writeup cursor-pointer text-[2.4vw] portrait:text-[5vw] flex items-center"><Image src={callIcon} alt="call-icon"/>{slice.primary.phonenumber}</div>

 
</div>



  </div>


  </Bounded>
    </section>
  );
};

export default EnquiresSection;
