
"use client"

import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import exitIcon from "../../../../public/exiticon.png"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStateContext } from "@/StateManager";


export default function SingleProductContainer({productData}:any) {


  interface Product {
    _id: string;
    quantity: number ;
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


  const [cartedProducts, setCartedProducts] = useState<Product[]>([]);
const {cartLength,setCartLength} = useStateContext() 







  const handleAddToCartedProducts = () => {
    const productToAdd = productData;


    const existingProductIndex = cartedProducts.findIndex(
             (item) => item._id === productToAdd._id
           );
    
           if (existingProductIndex !== -1) {
             alert('This Product is Already in Your cart');
    
           } else {
             const updatedProduct = {
               ...productToAdd, 
               quantity: 1,
               totalPrice: productToAdd.price, 
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

   <div className="hairContainer   flex flex-col landscape:flex-row landscape:justify-between landscape:items-start items-center text-center portrait:space-y-[3vw] ">
   <div className="imagecontainer">

<div className="complimentaryimages flex landscape:w-[8.5vw] portrait:w-full space-x-[1vw] mb-[1vw] portrait:sm:w-[10vw]">
     <Image alt='' src={`${productData?.productComplementaryImage1}`} className="rounded-lg " width={960} height={1280} />
     <Image alt='' src={`${productData?.productComplementaryImage2}`} className="rounded-lg " width={960} height={1280} />
     <Image alt='' src={`${productData?.productComplementaryImage3}`} className="rounded-lg " width={960} height={1280} />
     </div>
     <div  className="mainhairImage landscape:w-[28vw] portrait:w-full   portrait:sm:w-[40vw] object-contain">
     <Image alt='' src={`${productData?.productMainImage}`} className="rounded-lg " width={960} height={1280} />
     </div>

</div>

<div className="hairdetails ">

<div className="space-y-[1vw]"> 
<div className="hairTitle text-[2vw]   portrait:text-[5vw]">
          {productData?.title}
          
          </div>
        <div className="hairDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {productData?.shortDescription}
          </div>
          <div className="hairDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {productData?.fullDescription}
          </div>
        <div className="hairPrize   font-medium text-green-900 text-[2vw]  portrait:text-[4vw]">
        {productData?.price}
        </div>
</div>
   

      <div onClick={handleAddToCartedProducts} className="portrait:hidden addtocartedProductsbtn  mt-[4vw] px-10 py-2 bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out   text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md">Add to Cart</div>

      </div>
</div>

      
   
      <div onClick={handleAddToCartedProducts} className="  landscape:hidden addtocartedProductsbtn  px-10 py-2  bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md">Add to Cart</div>

</div>

     
</div>
    </Bounded>
    
  )
}
