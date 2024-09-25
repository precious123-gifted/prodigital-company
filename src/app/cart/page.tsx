
"use client"

import { useStateContext } from "@/StateManager";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Bounded from "../components/Bounded";
import TransitionLink from '../components/TransitionLink';
import gsap from "gsap";

export default function CartContainer() {


 

  interface Product {
    _id: string;
    quantity: number ;
    altText: string;
    totalPrice: number ;
    productMainImage:string;
    productComplementaryImage1:string;
    productComplementaryImage2: string;
    productComplementaryImage3:string ;
    brandName: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    price:number;}
  


  const [cartData, setCartData] = useState<Product[]>([]);
  const {cartLength,setCartLength} = useStateContext() 
  const {checkoutAmount,setCheckoutAmount} = useStateContext() 



const totalAmountRef = useRef(0); 

 

const calculateTotalCheckoutAmount = () => {
  let cartedProductsFromLS = localStorage.getItem("cartedProducts");

  if (cartedProductsFromLS) {
    const parsedCartData = JSON.parse(cartedProductsFromLS);

    totalAmountRef.current = parsedCartData.reduce((sum:any, product:any) => sum + (product.price * product.quantity), 0);
localStorage.setItem('checkoutamount', JSON.stringify(totalAmountRef.current));


  } else {
    totalAmountRef.current = 0;
localStorage.setItem('checkoutamount', JSON.stringify(totalAmountRef.current));



  }
};

useEffect(() => {
  calculateTotalCheckoutAmount();  
}, []);



const updateLocalStorage = (updatedCartData: any) => {
  localStorage.setItem('cartedProducts', JSON.stringify(updatedCartData));
};


const handleQuantityChange = (productId:any, change:any) => {
  
  const productIndex = cartData.findIndex((item) => item._id === productId);
  if (productIndex === -1) return;  

 
  const updatedProduct = { ...cartData[productIndex] };
  updatedProduct.quantity += change;  

  if (updatedProduct.quantity === 0) {
    const updatedCart = cartData.filter((item) => item._id !== productId);
    setCartData(updatedCart);
    updateLocalStorage(updatedCart);
    setCartLength(updatedCart.length)
  calculateTotalCheckoutAmount();  


  } else {
    updatedProduct.totalPrice = updatedProduct.price * updatedProduct.quantity;

    const updatedCart = [...cartData];
    updatedCart[productIndex] = updatedProduct;
    setCartData(updatedCart);
    
    updateLocalStorage(updatedCart);
  calculateTotalCheckoutAmount();  


  }
};








useEffect(() => {
  let cartedProductsFromLS = localStorage.getItem("cartedProducts");

  if (cartedProductsFromLS) {
    setCartLength(JSON.parse(cartedProductsFromLS).length);

    if (JSON.stringify(cartedProductsFromLS) !== JSON.stringify(cartData)) {
      setCartData(JSON.parse(cartedProductsFromLS)); 
    }
  }

 
}, [cartLength]);





const handleIncreamentAndDecreamentButtonClickAnimation = (target:any) => {
  gsap.to(target,0.1, {
    scale: 1.2, 
    ease: "circ.out",
    onComplete: () => {
      gsap.to(target, {
        scale: 1,  
        ease:  "sine.in",
      });
    },
  });
};
 



  return (
    <Bounded>
    <div className="w-full text-[#384d4d]   flex portrait:flex-col ">
      
    <div className="cart-container  w-[80%] portrait:w-[97%] pt-10 ">
    <table className=" table-auto w-[70%]  portrait:w-full">

    <tbody className="text-[1.2vw] w-full portrait:text-[3.6vw] portrait:sm:text-[3.2vw] ">

    {cartData.map((product) => {
  const totalPrice = product.price * product.quantity;

  return (
    <tr key={product._id} className="w-full">
      <td className="flex w-full items-start space-x-6 mb-10">
        <Image
          src={product.productMainImage}
          alt={product.altText}
          width={960}
          height={1280}
          className="rounded-lg w-[10vw] portrait:w-[30vw] portrait:sm:w-[22vw] object-contain"
        />

        <div className="w-full">
          <div className="title flex flex-col">
            <div className="title text-[1.3vw] portrait:text-[4vw] flex items-start font-medium text-balance ">
              <div>
                {product.brandName}
                <span className="ml-1 text-[#4b6363]">{product.title}</span>
              </div>
            </div>
            <div className="description"> {product.shortDescription}</div>
          </div>

          <div className="text-[1vw] portrait:text-[4vw] portrait:sm:text-[3vw]">
            {product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
          </div>
          <div className=" portrait:text-[5vw] portrait:sm:text-[4vw] mt-[1vw] portrait:mt-[2.4vw] mb-[0.8vw] portrait:mb-[2vw] flex items-center justify-between w-full">
          <div
    onClick={(event) => handleIncreamentAndDecreamentButtonClickAnimation(event.currentTarget)}
      className="increase-container "
    >
      <div
        className="increment-button text-[1.6vw] portrait:text-[7vw] portrait:sm:text-[5vw] text-[#31503d] bg-[#d1ebdb] p-1 rounded-full cursor-pointer"
        onClick={() => handleQuantityChange(product._id, 1)}
      >
        +
      </div>
    </div>
            <div className="text-[1.6vw] portrait:text-[5.4vw]"> {product.quantity} </div>

    
            <div     onClick={(event) => handleIncreamentAndDecreamentButtonClickAnimation(event.currentTarget)}

      className="decrease-container "><div className="decrease text-[1.6vw] portrait:text-[7vw] portrait:sm:text-[5vw] text-[#703b5a] bg-[#eccee0] p-1 rounded-full cursor-pointer" onClick={() => handleQuantityChange(product._id, -1)}>-</div></div>
          </div>
          <div className=" portrait:text-[5vw] portrait:sm:text-[4vw] text-[#314440]">
            {totalPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
          </div>
        </div>
      </td>
    </tr>
  );
})}

    </tbody>
  </table>
</div>


<div className="orderSummary w-[37%] portrait:w-full mb-10 space-y-8 p-8 bg-[#EEDDE7] rounded-md h-fit mt-14 flex flex-col items-center">

  <div className="heading w-full   text-[1.6vw] portrait:text-[6vw] portrait:sm:text-[4.8vw]">Order Summary</div>

  <div className="subNship w-full text-[1.3vw] portrait:text-[4.2vw] portrait:sm:text-[3.4vw]">
<div className="sub flex  justify-between"><div className="text">Subtotal</div><div className="amount">{totalAmountRef.current.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div></div>
<div className="ship flex justify-between"><div className="text">Delivery</div><div className="free">Charged Based on Location</div></div>
  </div>

  <div className="total w-full text-[1.3vw] portrait:text-[4.2vw] portrait:sm:text-[3.4vw] flex justify-between"><div className="text">Total</div><div className="amount">{totalAmountRef.current.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div></div>

<div className="checkoutBTN w-full  text-[1.6vw] portrait:text-[5.8vw] portrait:sm:text-[4.6vw] py-2 px-4 cursor-pointer text-[#e7d1c6] bg-[#31503d] hover:text-[#d1c0b7] hover:bg-[#15271c] duration-[1s] ease-in-out text-center  rounded-md">
   <TransitionLink  href={'/checkout'}
 > Checkout </TransitionLink></div>









</div>
    </div>
    </Bounded>
  )
}

