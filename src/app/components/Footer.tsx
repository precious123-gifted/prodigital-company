
import { createClient } from "@/prismicio";
import Bounded from "./Bounded";
import Image from "next/image";
import gmailIcon from "../../../public/gmailIcon.png";
import whatsappIcon from "../../../public/whatsappIcon.png";
import instagramIcon from "../../../public/instagramIcon.png";
import facebookIcon from "../../../public/facebookIcon.png";
import TransitionLink from "./TransitionLink";




export default async function Footer() {

    const client = createClient()

    const settings = await client.getSingle('nav')

  return (
    <Bounded>
    <div className="content  bg-[#141C1C] text-[#c9bfc4]  w-full px-5 py-8 pt-8 flex flex-row justify-between  portrait:sm:flex-row  portrait:sm:justify-between portrait:flex-col portrait:space-y-6 portrait:sm:space-y-0  ">


<div className="addressNpolicySection space-y-3 landscape:w-[40%] portrait:sm:w-[50%]">

<div className="addressDiv space-y-1">
  <div className="title text-[1.7vw] portrait:sm:text-[4vw] portrait:text-[7vw]">Address</div>
  <div className="address text-[1.2vw]  portrait:sm:text-[3vw] portrait:text-[5vw]">{settings.data.address}</div>
</div>



</div>




<div className="customerSupportSection space-y-3">
  <div className="header text-[1.7vw] portrait:sm:text-[4vw] portrait:text-[7vw]">Customer Support</div>
  <div className="refundPolicyLink text-[1.2vw]  portrait:sm:text-[3vw] portrait:text-[5vw] hover:text-[#E2CABE]"><TransitionLink href={"/refundpolicy"}>Refund Policy</TransitionLink></div>
  <div className="termsNconditionLink text-[1.2vw]  portrait:sm:text-[3vw] portrait:text-[5vw] hover:text-[#E2CABE]"><TransitionLink href={"/termsandconditions"}>Terms and Conditions</TransitionLink></div>

  <div className="deliveryLink text-[1.2vw]  portrait:sm:text-[3vw] portrait:text-[5vw] hover:text-[#E2CABE]"><TransitionLink href={"/deliverypolicy"}>Delivery Policy</TransitionLink></div>

    <div className="contactDiv space-y-2">
<div className="title text-[1.6vw] portrait:sm:text-[3.5vw] portrait:text-[6.5vw]">Contact Us</div>


<div className="icons flex space-x-6 portrait:space-x-9"> 
<Image src={ gmailIcon} alt="gmail icon" className=" w-[2vw] portrait:w-[7vw] portrait:sm:w-[3.5vw] object-contain"/>
<Image src={ whatsappIcon} alt="whatsapp icon" className=" w-[2vw] portrait:w-[7vw] portrait:sm:w-[3.5vw] object-contain"/>
<Image src={ instagramIcon} alt="instagram icon" className=" w-[2vw] portrait:w-[7vw] portrait:sm:w-[3.5vw] object-contain"/>
<Image src={ facebookIcon} alt="facebook icon" className=" w-[2vw] portrait:w-[7vw] portrait:sm:w-[3.5vw] object-contain"/>

</div>






    </div>

</div>

  
    </div>
  
  <div className="copyRightDiv flex portrait:flex-col justify-between px-5 py-2 text-[#2a3a3a]  text-[1.2vw]  portrait:sm:text-[3vw] portrait:text-[3.7vw]  "> <div className="preciousOG">site by PreciousOG</div>   <div className="prodigital">© 2024 Pro Digital - All Rights Reserved</div> </div>
  
  
  
      </Bounded>
  )
}
