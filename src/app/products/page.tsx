
import { Pontano_Sans } from "next/font/google";
import ProductsData from "./ProcessedData";




const pontanoSans = Pontano_Sans({subsets: ["latin"],weight: "400"})
export default async function Products() {





  return (
    <section className=" flex justify-center bg-[#EBFEFF] text-[#333D3E]"  style={pontanoSans.style}>

<ProductsData/>

    </section>
  )
}
