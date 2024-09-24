
"use client"

import Bounded from "@/app/components/Bounded";
import exitIcon from "../../../../public/exiticon.png"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "@/StateManager";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import gsap from "gsap";



export default function SingleProductGottenFromParametersIDContainer({singleProductGottenFromParametersID}:any) {


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







  const productToAdd = singleProductGottenFromParametersID;
  const existingProductIndex = cartedProducts.findIndex(
           (item) => item._id === productToAdd._id
         );
  const handleTheAddingOfSelectedProductToTheListOfCartedProducts = () => {
    
           if (existingProductIndex !== -1) {
            setPopupType("warning")
            setDisplayPopUp(true)
            setPopupMessage('This Product is Already in Your cart')
            gsap.to(['.addtocartedProductsbtn','.addtocartedProductsbtnMobile'],{pointerEvents:'none',onComplete:()=>{setTimeout(() => {
              gsap.to(['.addtocartedProductsbtn','.addtocartedProductsbtnMobile'],{pointerEvents:'auto'})
            }, 2000);}})
    
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
    setPopupType("success")
    setDisplayPopUp(true)
    setPopupMessage('This Product has been added to Your Cart')
    gsap.to(['.addtocartedProductsbtn','.addtocartedProductsbtnMobile'],{pointerEvents:'none',onComplete:()=>{setTimeout(() => {
      gsap.to(['.addtocartedProductsbtn','.addtocartedProductsbtnMobile'],{pointerEvents:'auto'})
    }, 2000);}})


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

    console.table(singleProductGottenFromParametersID)
  }, []);

  



  const router = useRouter();


  const handleExitClick = () => {
    window.history.back();
    
  };



const mainImage = useRef(null)
const complImage1 = useRef(null)
const complImage2 = useRef(null)
const complImage3 = useRef(null)
const complImage4 = useRef(null)

const [selectedImage, setSelectedImage] = useState(singleProductGottenFromParametersID.productMainImage); 

const handleComplimentoryImageClicking = (imageUrl:string) => {
  
        
        gsap.to(".mainImage",0.3,{scale:0.4,opacity:'30%',ease:  "sine.in",onComplete:()=>{setSelectedImage(imageUrl);gsap.to(".mainImage",0.3,{scale:1,opacity:'100%',ease:  "sine.in",})}})
        
        
};
 


const {displayPopUp,setDisplayPopUp} = useStateContext() 
const {popupType,setPopupType} = useStateContext() 
const {popupMessage,setPopupMessage} = useStateContext() 

    
  return (
<Bounded>
      <div className=" productexpandedcontainer  text-[#384d4d] w-auto   flex flex-col  items-center text-center space-y-5  portrait:px-[8vw] py-[2vw] portrait:py-[8vw]">
<div className="exiticon    w-full flex justify-end ">
 
<Image onClick={handleExitClick} src={exitIcon} alt="exit-icon" className="landscape:w-[2vw] portrait:w-[6vw] portrait:sm:w-[4vw]  object-cover cursor-pointer"/>
</div>
    
<div className="content landscape:w-[55%] space-y-[10vw]">

   <div className="productContainer w-full   flex flex-col landscape:space-x-12  landscape:flex-row landscape:justify-between landscape:items-start items-center text-center portrait:space-y-[3vw] ">
   <div className="imagecontainer w-full">

<div className="complimentaryimages flex landscape:w-[24vw] portrait:w-full   portrait:sm:w-full justify-between mb-[1vw] portrait:mb-[4vw] ">
    <Image
    onClick={() => handleComplimentoryImageClicking(singleProductGottenFromParametersID?.productMainImage)}
    ref={complImage1} alt={singleProductGottenFromParametersID?.altText} src={`${singleProductGottenFromParametersID?.productMainImage}`} className={cn(`rounded-lg cursor-pointer w-[5vw] portrait:w-[14vw] object-fit transition duration-300 ease-in-out`,selectedImage === singleProductGottenFromParametersID.productMainImage && 'border-4 portrait:sm:border-[0.9vw] border-solid border-[#314440]',)}  width={960} height={1280} />
    <Image 
    onClick={() => handleComplimentoryImageClicking(singleProductGottenFromParametersID?.productComplementaryImage1)}
    ref={complImage2} alt={singleProductGottenFromParametersID?.altText} src={`${singleProductGottenFromParametersID?.productComplementaryImage1}`} className={cn(`rounded-lg cursor-pointer w-[5vw] portrait:w-[14vw] object-fit transition duration-300 ease-in-out`,selectedImage === singleProductGottenFromParametersID.productComplementaryImage1 && 'border-4 portrait:sm:border-[0.9vw] border-solid border-[#314440]',)}   width={960} height={1280} />
     <Image 
    onClick={() => handleComplimentoryImageClicking(singleProductGottenFromParametersID?.productComplementaryImage2)}
     
     ref={complImage3} alt={singleProductGottenFromParametersID?.altText} src={`${singleProductGottenFromParametersID?.productComplementaryImage2}`} className={cn(`rounded-lg cursor-pointer w-[5vw] portrait:w-[14vw] object-fit transition duration-300 ease-in-out`,selectedImage === singleProductGottenFromParametersID.productComplementaryImage2 && 'border-4 portrait:sm:border-[0.9vw] border-solid border-[#314440]',)}  width={960} height={1280} />
     <Image 
    onClick={() => handleComplimentoryImageClicking(singleProductGottenFromParametersID?.productComplementaryImage3)}
     
     ref={complImage4} alt={singleProductGottenFromParametersID?.altText} src={`${singleProductGottenFromParametersID?.productComplementaryImage3}`} className={cn(`rounded-lg cursor-pointer w-[5vw] portrait:w-[14vw] object-fit transition duration-300 ease-in-out`,selectedImage === singleProductGottenFromParametersID.productComplementaryImage3 && 'border-4 portrait:sm:border-[0.9vw] border-solid border-[#314440]',)}  width={960} height={1280} />
     </div>
     <div  className="mainImage landscape:w-[24vw] portrait:w-full   portrait:sm:w-full object-fit">
     <Image ref={mainImage} alt={singleProductGottenFromParametersID?.altText} src={selectedImage} className="rounded-lg " width={960} height={1280} />
     </div>

</div>

<div className="productdetails text-left w-full">

<div className="space-y-[1vw]"> 
<div className="laptopTitle cursor-pointer text-[2vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{singleProductGottenFromParametersID.brandName}<span className="ml-1 text-[#4b6363] text-wrap">{singleProductGottenFromParametersID.title}</span></div></div>

        <div className="productDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {singleProductGottenFromParametersID?.shortDescription}
          </div>
          <div className="productDescription text-[1.5vw]   portrait:text-[4vw] portrait:sm:text-[3vw]  ">
        {singleProductGottenFromParametersID?.fullDescription}
          </div>
        <div className="productPrize   font-medium text-green-900 text-[2vw]  portrait:text-[4vw]">
        {singleProductGottenFromParametersID.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
        </div>
</div>
   

      <div onClick={handleTheAddingOfSelectedProductToTheListOfCartedProducts} className="addtocartedProductsbtn portrait:hidden   mt-[4vw] px-10 py-2 bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out   text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md text-center">{existingProductIndex === -1 &&<>Add to Cart</>}{existingProductIndex !== -1 &&<>Added to Cart</>}</div>

      </div>
</div>

      
   
      <div onClick={handleTheAddingOfSelectedProductToTheListOfCartedProducts} className="addtocartedProductsbtnMObile  landscape:hidden   px-10 py-2  bg-[#202c2c] cursor-pointer text-[#F5ECF1] hover:text-[#bbdabd] hover:bg-[#121f1f] duration-[1s] ease-in-out text-[1.5vw] portrait:text-[6vw]  portrait:sm:text-[4vw] rounded-md text-center">{existingProductIndex === -1 &&<>Add to Cart</>}{existingProductIndex !== -1 &&<>Added to Cart</>}</div>

</div>

     
</div>

    </Bounded>
    
  )
}
