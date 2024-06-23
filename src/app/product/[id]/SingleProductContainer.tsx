
"use client"

import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import exitIcon from "../../../../public/exiticon.png"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStateContext } from "@/StateManager";
import { StateContextType } from "@/StateManager";


export default function SingleProductContainer({singleProduct}:any) {


  interface Product {
    _id: string;
    quantity: number ;// Assuming price is a number
    totalPrice: number ;
    product: {
            mainimage:PrismicNextImage;
            complimentaryimage1:PrismicNextImage;
            complimentaryimage2:PrismicNextImage;
            complimentaryimage3:PrismicNextImage;
            brandname: string;
            title: string;
            shortdescription: string;
            fulldescription: string;
            price:number;
    };
  }
  
  interface PrismicNextImage {
    dimensions: {
      width: number;
      height: number;
    };
    alt: string;
    copyright: null | string; 
    url: string;
    id: string;
    edit: {
      x: number;
      y: number;
      zoom: number;
      background: string;
    };
  }


  const [cartedProducts, setCartedProducts] = useState<Product[]>([]); // Manage cartedProducts state in local storage
const {cartedProductsFromState,setCartedProductsFromState} = useStateContext() 
const {cartLength,setCartLength} = useStateContext() 







  const handleAddToCartedProducts = () => {
    const productToAdd = singleProduct;


    const existingProductIndex = cartedProducts.findIndex(
             (item) => item._id === productToAdd._id
           );
    
           if (existingProductIndex !== -1) {
             // Product already in cartedProducts, handle quantity adjustments (optional)
             alert('This Product is Already in Your cart');
             // Update cartedProducts quantity using setCartedProducts
             console.log(`this is the cart length ${cartLength}`)
    
           } else {
             const updatedProduct = {
               ...productToAdd, // Spread existing product properties
               quantity: 1, // Initial quantity (adjust as needed)
               totalPrice: productToAdd.price, // Assuming "hairprize" holds the price
             };
      

    setCartedProducts((prevCartedProducts) => [
      ...prevCartedProducts,
      updatedProduct,
    ]);

    localStorage.setItem(
      "cartedProducts",
      JSON.stringify([...cartedProducts, updatedProduct])
    );

    let cartedProductsFromLS = localStorage.getItem("cartedProducts");
    
    if (cartedProductsFromLS)setCartLength(JSON.parse(cartedProductsFromLS).length);
    
  };
  }



 
  useEffect(() => {
    const existingCartedProductsData = localStorage.getItem("cartedProducts");

    if (!existingCartedProductsData) {
      localStorage.setItem("cartedProducts", JSON.stringify([]));

    } else {
      setCartedProducts(JSON.parse(existingCartedProductsData));
      setCartLength(JSON.parse(existingCartedProductsData).length);
    }

    console.table(singleProduct)
  }, []);

  






  const handleExitClick = () => {

    window.history.back();
  };


 


    
  return (
<Bounded>
      <div className=" hairexpandedcontainer  text-[#384d4d] w-auto   flex flex-col  items-center text-center space-y-5  portrait:px-[8vw] py-[2vw] portrait:py-[8vw]">
<div className="exiticon    w-full flex justify-end ">
 
<Image onClick={handleExitClick} src={exitIcon} alt="exit-icon" className="landscape:w-[2vw] portrait:w-[6vw] portrait:sm:w-[4vw]  object-cover cursor-pointer"/>
</div>
    
<div className="content landscape:w-[55%] space-y-[10vw]">

   <div className="hairContainer w-full   flex flex-col  landscape:flex-row landscape:justify-between landscape:items-start items-center text-center portrait:space-y-[3vw] ">
   <div className="imagecontainer w-full">

<div className="complimentaryimages flex landscape:w-[24vw] portrait:w-full   portrait:sm:w-full justify-between mb-[1vw] portrait:mb-[4vw] ">
    <Image alt='' src={`${singleProduct?.productComplementaryImage1}`} className="rounded-lg w-[6vw] portrait:w-[14vw] object-fit"  width={960} height={1280} />
     <Image alt='' src={`${singleProduct?.productComplementaryImage2}`} className="rounded-lg w-[6vw] portrait:w-[14vw] object-fit" width={960} height={1280} />
     <Image alt='' src={`${singleProduct?.productComplementaryImage3}`} className="rounded-lg w-[6vw] portrait:w-[14vw] object-fit" width={960} height={1280} />
     </div>
     <div  className="mainhairImage landscape:w-[24vw] portrait:w-full   portrait:sm:w-full object-fit">
     <Image alt='' src={`${singleProduct?.productMainImage}`} className="rounded-lg " width={960} height={1280} />
     </div>

</div>

<div className="hairdetails text-left ">

<div className="space-y-[1vw]"> 
<div className="hairTitle text-[2vw]   portrait:text-[5vw]">
          {singleProduct?.title}
          
          </div>
        <div className="hairDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {singleProduct?.shortDescription}
          </div>
          <div className="hairDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {singleProduct?.fullDescription}
          </div>
        <div className="hairPrize   font-medium text-green-900 text-[2vw]  portrait:text-[4vw]">
        {singleProduct?.price}
        </div>
</div>
   

      <div onClick={handleAddToCartedProducts} className="portrait:hidden addtocartedProductsbtn  mt-[4vw] px-10 py-2 bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out   text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md text-center">Add to Cart</div>

      </div>
</div>

      
   
      <div onClick={handleAddToCartedProducts} className="  landscape:hidden addtocartedProductsbtn  px-10 py-2  bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md text-center">Add to Cart</div>

</div>

     
</div>
    </Bounded>
    
  )
}
