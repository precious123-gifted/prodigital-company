"use client"


import React, { useEffect, useState } from 'react'
import dbConnect from "@/lib/dbConnect";
import Link from 'next/link';
import Image from 'next/image';
import { useStateContext } from "@/StateManager";





export default function AdminClientPage({allProducts}:any) {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigital-company.vercel.app";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
     const loginUrl = `${baseUrl}/api/login`;

  

     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');




    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    

      
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
    
      const userName = formData.get('userName');
      const password = formData.get('password');
  
    
     
      const loginData = { userName, password };
    
      console.table(loginData);
    
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        });
    
        if (response.ok) {
          const data = await response.json();
         
          console.log('Data sent successfully:', data);
          setIsAuthenticated(true)
          console.log(isAuthenticated)
        } else if (response.status === 409) {
          console.error('Server responded with conflict (409):', response.statusText);
          alert('username or password is incorrect.'); 
        } else {
          
          console.error('Server responded with error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

  
      const [imageData, setImageData] = useState<string | null>(null);
      const [imageData1, setImageData1] = useState<string | null>(null);
      const [imageData2, setImageData2] = useState<string | null>(null);
      const [imageData3, setImageData3] = useState<string | null>(null);
      const [products, setProducts] = useState();
      const {productOfTheWeek, setProductOfTheWeek} = useStateContext();





  




      
      
      const handleImage = (event: React.ChangeEvent<HTMLInputElement>,number:number) => {
        console.log("Handle image called");
        
        const selectedFile = event.target.files?.[0];
      console.table(allProducts)

        if (selectedFile) {
          const reader = new FileReader();
      
          reader.onload = (event) => {
            if (event.target && event.target.result) {
              const imageData = event.target.result as string; 
              
              switch (number) {
                case 0:
                  setImageData(imageData);
                  break;
                case 1:
                  setImageData1(imageData);
                  break;
                case 2:
                  setImageData2(imageData);
                  break;
                case 3:
                  setImageData3(imageData);
                  break;
                default:
                  console.error('Invalid number passed to handleImage');
              }

            } else {
              console.error('Error reading file'); 
            }
          };
      
          reader.onerror = (error) => {
            console.error('Error reading file:', error); 
          };
      
          reader.readAsDataURL(selectedFile); 
        } else {
          console.error('No file selected'); 
        }
      };
      


      
      

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      

        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
      
        const altText = formData.get('product_image_alt');
        const category = formData.get('productCategory');
        const brandName = formData.get('brandname');
        const title = formData.get('title');
        const shortDescription = formData.get('shortdescription');
        const fullDescription = formData.get('fulldescription');
        const price = formData.get('price');
      
        const product = [
          {
            productMainImage: imageData,
            productComplementaryImage1: imageData1,
            productComplementaryImage2: imageData2,
            productComplementaryImage3: imageData3,
            altText,
            category,
            brandName,
            title,
            shortDescription,
            fullDescription,
            price,
            postedAt: new Date().toISOString(),
          },
        ];
      
        console.table(product);
      
        try {
          const response = await fetch(allProductsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          });
      
          if (response.ok) {
            const data = await response.json();
           
            console.log('Data sent successfully:', data);
          } else if (response.status === 409) {
            console.error('Server responded with conflict (409):', response.statusText);
            alert('This product image already exist. Please use a different image and try again.'); 
          } else {
            console.error('Server responded with error:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
      
        





  return (
   
<div className="content">
  
{isAuthenticated ? (
  


  

  <>
<form  
onSubmit={handleSubmit}
 className="add_product_div">

<div className="image_div">

<div className="mainimage">
<label htmlFor="product_main_image">Upload Your Main Image:</label>
<input type="file" id="product_main_image" name="product_main_image" onChange={(event)=>{handleImage(event,0)}}  accept="image/*"/>
</div>

<div className="complementary_image">
<label htmlFor="product_complementary_image1">Upload a Complementary Image:</label>
<input type="file" id="product_complementary_image1" name="product_complementary_image1" onChange={(event)=>{handleImage(event,1)}} accept="image/*"/>
</div>

<div className="complementary_image">
<label htmlFor="product_complementary_image2">Upload a Complementary Image:</label>
<input type="file" id="product_complementary_image2" name="product_complementary_image2" onChange={(event)=>{handleImage(event,2)}} accept="image/*"/>
</div>

<div className="complementary_image">
<label htmlFor="product_complementary_image3">Upload a Complementary Image:</label>
<input type="file" id="product_complementary_image3"  name="product_complementary_image3" onChange={(event)=>{handleImage(event,3)}} accept="image/*"/>
</div>

<input type="text" id="product_image_alt" name="product_image_alt" placeholder="Enter Alt Text" />


</div>

<div className="category_div">
<select id="productCategory" name="productCategory" >
  <option value="">Add a product category</option>
  <option value="Accessories">Accessories</option>
  <option value="NewLaptops">New Laptops</option>
  <option value="UsedLaptops">Used Laptops</option>
</select>
</div>

<div className="brandname_div"><input type="text" className="brandname" name="brandname" placeholder='Add a Brand Name' /></div>
<div className="title_div"><input type="text" className="title" name="title" placeholder='Add a Title' /></div>
<div className="shortdescription_div"><input type="text" className="shortdescription" name="shortdescription" placeholder='Add a Short Description' /></div>
<div className="fulldescription_div"><input type="text" className="fulldescription"  name="fulldescription" placeholder='Add a full Description' /></div>
<div className="price_div"><input type="number" className="price" name="price" placeholder='Add a Price' /></div>



<button type="submit">Post Product</button>





</form>




<div className="diplay_added_products">

<div className="w-full pb-[4vw]">      
   




   <div className="w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20">
       {allProducts.map((product:any,index:number) => (
             <div
               key={product._id}
               id={product._id}
            //    ref={productrefs.current[index] = React.createRef<HTMLDivElement>()}
               // onClick={()=>{microActionOnProductClick(productrefs.current[index])}}
               className="laptopProduct  hover:border-x-2
               landscape:hover:border-[#bad8d863] duration-[0.2s]  ease-in-out w-auto flex flex-col items-center text-start  space-y-1"
             >
                <div className="flex flex-col items-start">
               <Link  href={`admin/product/${product._id}`}> 
                 <div className="laptopImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                   <Image alt='' src={`${product.productMainImage}`} className="rounded-lg " width={960} height={1280} />
                 </div>
               </Link>
               <Link href={`/product/${product._id}`}> 
                 <div className="laptopTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{product.brandName}<span className="ml-1 text-[#4b6363] text-wrap">{product.title}</span></div></div>
               </Link>
               <div className="laptopDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.shortDescription}</div>
               <div className="laptopPrice w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.price}</div>
             </div>
             </div>
           ))}
         </div>
         </div>
</div>

</>
) : (
  <form onSubmit={handleLogin}>
   
<input type="text" name='userName' placeholder='userName' />
<input type="text" name='password'  placeholder='password' />

    <button type="submit">Login</button>
  </form>
)}


</div>




  )
}


