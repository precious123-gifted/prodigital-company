
"use client"

import { useStateContext } from "@/StateManager";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Bounded from "../components/Bounded";

export default function CartContainer() {

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


  const [cartData, setCartData] = useState<Product[]>([]);
const {cartLength,setCartLength} = useStateContext() 



const totalAmountRef = useRef(0); // Create a Ref to store the total amount

// const calculateTotalAmount = () => {
//   totalAmountRef.current = cartData.reduce((sum, product) => sum + (product.totalPrice), 0);
// };

const calculateTotalAmount = () => {
  // Retrieve cart data from local storage
  let cartedProductsFromLS = localStorage.getItem("cartedProducts");

  // Check if data exists in local storage
  if (cartedProductsFromLS) {
    const parsedCartData = JSON.parse(cartedProductsFromLS);

    // Calculate total amount using parsed data
    totalAmountRef.current = parsedCartData.reduce((sum:any, product:any) => sum + (product.price * product.quantity), 0);
  } else {
    // Set total amount to 0 if no data in local storage
    totalAmountRef.current = 0;
  }
};

useEffect(() => {
  calculateTotalAmount(); // Calculate total amount on initial render and cart data changes
}, []);



const updateLocalStorage = (updatedCartData: any) => {
  // Store the updated cart data in local storage
  localStorage.setItem('cartedProducts', JSON.stringify(updatedCartData));
};
// Update local storage logic (replace with your actual storage implementation)


const handleQuantityChange = (productId:any, change:any) => {
  // Find the product in the cart
  const productIndex = cartData.findIndex((item) => item._id === productId);
  if (productIndex === -1) return; // Product not found

  // Update quantity and total price
  const updatedProduct = { ...cartData[productIndex] };
  updatedProduct.quantity += change; // Increase or decrease quantity

  // Handle quantity reaching 1
  if (updatedProduct.quantity === 0) {
    // Remove product from cart
    const updatedCart = cartData.filter((item) => item._id !== productId);
    setCartData(updatedCart);
    updateLocalStorage(updatedCart);
    setCartLength(updatedCart.length)
  calculateTotalAmount(); // Calculate total amount on initial render and cart data changes


    // Update local storage here (see explanation below)
  } else {
    // Update product quantity and total price
    updatedProduct.totalPrice = updatedProduct.price * updatedProduct.quantity;

    // Update cart data in state
    const updatedCart = [...cartData];
    updatedCart[productIndex] = updatedProduct;
    setCartData(updatedCart);
    
    // Update local storage here (see explanation below)
    updateLocalStorage(updatedCart);
  calculateTotalAmount(); // Calculate total amount on initial render and cart data changes


  }
};



// useEffect(() => {
//   // Update local storage whenever cartData changes

//   updateLocalStorage(cartData);

//   const existingCartedProductsData = localStorage.getItem("cartedProducts");

//   if(existingCartedProductsData)setCartLength(JSON.parse(existingCartedProductsData).length);
// }, [cartData,cartLength]); // Dependency on cartData




useEffect(() => {
  // Retrieve cart data from local storage
  let cartedProductsFromLS = localStorage.getItem("cartedProducts");

  if (cartedProductsFromLS) {
    // Parse and set cart length (assuming it's calculated from cart items)
    setCartLength(JSON.parse(cartedProductsFromLS).length);

    // Update state only if local storage data is different from current state
    if (JSON.stringify(cartedProductsFromLS) !== JSON.stringify(cartData)) {
      setCartData(JSON.parse(cartedProductsFromLS)); 
    }
  }

  // Update local storage whenever cartData changes
 
}, [cartLength]);








  return (
    <Bounded>
    <div className="w-full text-[#384d4d]   flex portrait:flex-col ">
      
    <div className="cart-container  w-[80%] portrait:w-[97%] pt-10 ">
    <table className=" table-auto w-[70%]  portrait:w-full">

    <tbody className="text-[1.2vw] w-full portrait:text-[3.6vw] portrait:sm:text-[3.2vw] ">
      {cartData.map((product) => (
        <tr key={product._id} className="w-full" >
          <td className="flex w-full  items-start space-x-6 mb-10   ">  
            <Image src={product.productMainImage} alt={product.altText} width={960} height={1280} className="rounded-lg w-[10vw] portrait:w-[30vw] portrait:sm:w-[22vw] object-contain"/>
             
             <div className="w-full">
              <div className="title flex flex-col  ">
              <div className="title text-[1.3vw] portrait:text-[4vw] flex items-start font-medium text-balance "><div >{product.brandName}<span className="ml-1 text-[#4b6363]">{product.title}</span></div></div>
               <div className="description"> {product.shortDescription}</div>
              </div>

              <div className="text-[1vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.price}</div>
          <div className="  portrait:text-[5vw] portrait:sm:text-[4vw] mt-[1vw] portrait:mt-[2.4vw] mb-[0.8vw] portrait:mb-[2vw] flex items-center justify-between w-full"><div className="increase text-[1.6vw] portrait:text-[7vw] portrait:sm:text-[5vw] text-[#31503d] bg-[#d1ebdb]  p-1 rounded-full cursor-pointer" onClick={() => handleQuantityChange(product._id, 1)}>+</div><div  className="text-[1.6vw] portrait:text-[5.4vw]"> {product.quantity} </div><div className="decrease text-[1.6vw] portrait:text-[7vw] portrait:sm:text-[5vw] text-[#703b5a] bg-[#eccee0] p-1 rounded-full cursor-pointer" onClick={() => handleQuantityChange(product._id, -1)}>-</div></div>
          <div className="  portrait:text-[5vw] portrait:sm:text-[4vw] text-[#314440]">
            {product.price * product.quantity}
          </div> 
          </div>
               </td>
         
        </tr>
      ))}
    </tbody>
  </table>
</div>


<div className="orderSummary w-[37%] portrait:w-full mb-10 space-y-8 p-8 bg-[#EEDDE7] rounded-md h-fit mt-14 flex flex-col items-center">

  <div className="heading w-full   text-[1.6vw] portrait:text-[6vw] portrait:sm:text-[4.8vw]">Order Summary</div>

  <div className="subNship w-full text-[1.3vw] portrait:text-[4.2vw] portrait:sm:text-[3.4vw]">
<div className="sub flex  justify-between"><div className="text">Subtotal</div><div className="amount">${totalAmountRef.current}</div></div>
<div className="ship flex justify-between"><div className="text">Delivery</div><div className="free">Charged Based on Location</div></div>
  </div>

  <div className="total w-full text-[1.3vw] portrait:text-[4.2vw] portrait:sm:text-[3.4vw] flex justify-between"><div className="text">Total</div><div className="amount">${totalAmountRef.current}</div></div>

  <div className="checkoutBTN w-full  text-[1.6vw] portrait:text-[5.8vw] portrait:sm:text-[4.6vw] py-2 px-4 cursor-pointer text-[#e7d1c6] bg-[#31503d] hover:text-[#d1c0b7] hover:bg-[#15271c] duration-[1s] ease-in-out text-center  rounded-md">Checkout</div>









</div>
    </div>
    </Bounded>
  )
}

