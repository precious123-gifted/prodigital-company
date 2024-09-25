"use client"


import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { ToastContainer, toast } from "react-toastify";
import imagePlaceholder from "../../../public/image-fill.png"
import { useStateContext } from '@/StateManager';
import TransitionLink from '../components/TransitionLink';









export default function AdminClientPage({allProducts}:any) {


  const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:3000`
    : "https://prodigitalcompany.com.ng";
   const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
   

 


      const {displayPopUp,setDisplayPopUp} = useStateContext() 
      const {popupType,setPopupType} = useStateContext() 
      const {popupMessage,setPopupMessage} = useStateContext() 
 








      const uploadProduct = async (event: React.FormEvent<HTMLFormElement>) => {



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
            imageID:resource ? (typeof resource === 'object' && isCloudinaryInfo(resource) ? resource.public_id : null) : null,
            image1ID:resource1 ? (typeof resource1 === 'object' && isCloudinaryInfo(resource1) ? resource1.public_id : null) : null,
            image2ID:resource2 ? (typeof resource2 === 'object' && isCloudinaryInfo(resource2) ? resource2.public_id : null) : null,
            image3ID:resource3 ? (typeof resource3 === 'object' && isCloudinaryInfo(resource3) ? resource3.public_id : null) : null,
            productMainImage: resource ? (typeof resource === 'object' && isCloudinaryInfo(resource) ? resource.url : null) : null,
            productComplementaryImage1: resource1 ? (typeof resource1 === 'object' && isCloudinaryInfo(resource1) ? resource1.url : null) : null,
            productComplementaryImage2: resource2 ? (typeof resource2 === 'object' && isCloudinaryInfo(resource2) ? resource2.url : null) : null,
            productComplementaryImage3: resource3 ? (typeof resource3 === 'object' && isCloudinaryInfo(resource3) ? resource3.url : null) : null,
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



        try {
          const response = await fetch(allProductsUrl, {
            method: 'POST',
            headers: { 'Content-Type': "application/x-www-form-urlencoded", },
            body: JSON.stringify(product),
          });

          if (response.status === 201) {
            localStorage.removeItem("RESOURCE_ID_KEY")
            localStorage.removeItem("RESOURCE_ID_KEY1")
            localStorage.removeItem("RESOURCE_ID_KEY2")
            localStorage.removeItem("RESOURCE_ID_KEY3")

           await response.json()
            .then(data => {
              console.log('Data sent successfully:', data);
              return ()=>{ 
                setPopupType('success')
                setDisplayPopUp(true)
                setPopupMessage('Product Successfully Uploaded')}; 
            })
            .then(() => {
           
              window.location.reload()

            })
            
           

           
           
          } else if (response.status === 409) {
            console.error('Server responded with conflict (409):', response.statusText);
            setPopupType('warning')
            setDisplayPopUp(true)
            setPopupMessage('This product already exist. Please use a different description and try again.');
          } else {
            setPopupType('warning')
            setDisplayPopUp(true)
            setPopupMessage('Please Kindly Fill all Details for the Product')
            console.error('Server responded with error:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };














      interface CloudinaryImageInfo {
        public_id?: string;
        secure_url?: string;
        url?: string;
      }
      const [resource, setResource] = useState<CloudinaryImageInfo | null | string>(null);
      const [resource1, setResource1] = useState<CloudinaryImageInfo | null | string>(null);
      const [resource2, setResource2] = useState<CloudinaryImageInfo | null | string>(null);
      const [resource3, setResource3] = useState<CloudinaryImageInfo | null | string>(null);

      
function isCloudinaryInfo(value: string | CloudinaryImageInfo): value is CloudinaryImageInfo {
  return typeof value === 'object' && 'public_id' in value; 
}



const mainImageInputRef = useRef<HTMLDivElement>(null);
const complimentaryImage1InputRef = useRef<HTMLDivElement>(null);
const complimentaryImage2InputRef = useRef<HTMLDivElement>(null);
const complimentaryImage3InputRef = useRef<HTMLDivElement>(null);


const changeImage = (number:number) => {


  switch (number) {
    case 0:
    mainImageInputRef.current?.click();
      break;
    case 1:
      complimentaryImage1InputRef.current?.click();
      break;
    case 2:
      complimentaryImage2InputRef.current?.click();

      break;
    case 3:
      complimentaryImage3InputRef.current?.click();

      break;
    default:
      console.error('Invalid number passed to handleImage');
  }

};

const deleteBTN = useRef<HTMLDivElement>(null);
const deleteBTN1 = useRef<HTMLDivElement>(null);
const deleteBTN2 = useRef<HTMLDivElement>(null);
const deleteBTN3 = useRef<HTMLDivElement>(null);


const deleteImages = async () => {
  const resourceKeys = [
    "RESOURCE_ID_KEY",
    "RESOURCE_ID_KEY1",
    "RESOURCE_ID_KEY2",
    "RESOURCE_ID_KEY3",
  ];

  for (const key of resourceKeys) {
    const resourceString = localStorage.getItem(key);

    if (resourceString) {
      try {
        const resourceObject = JSON.parse(resourceString);
        const public_id = resourceObject.public_id;
        console.log("Deleting image:", public_id);

        const response = await fetch(`${baseUrl}/api/removeCloudinaryImage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id }),
        });

        if (response.ok) {
          localStorage.removeItem(key);
          console.log("Image deleted from local storage:", public_id);
        } else {
          console.error("Error deleting image from server:", public_id);
        }
      } catch (error) {
        console.error("Error processing resource:", key, error);
      }
    } else {
      console.log("No image resource found for key:", key);
    }
  }
};



useEffect(() => {
deleteImages()

}, []);


const handleImageDelete = async(public_id:any,number:number ) =>{


  if (!public_id ) {
    console.error('No public_id available for deletion');
    return; 
  }

  try {
    const response = await fetch(`${baseUrl}/api/removeCloudinaryImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id }),
    });
if(response.ok){

  switch (number) {
    case 0:
    setResource(null);
      break;
    case 1:
      setResource1(null);
      break;
    case 2:
      setResource2(null);

      break;
    case 3:
      setResource3(null);

      break;
    default:
      console.error('Invalid number passed to handleImage');
  }



}

}

catch (error) {
  console.error('Error deleting image:', error);
}
}




  return (

<div className="content portrait:pt-[6vw]">

 





  <>
  <ToastContainer/>
<form
onSubmit={uploadProduct}
 className="add_product_div w-full flex-col mb-[10vw] portrait:mb-[14vw] ">

<div className="image_div mb-10 portrait:mb-[60vw] portrait:sm:mb-[50vw] relative   w-full grid  portrait:grid-cols-2 landscape:grid-cols-4     gap-y-20  portrait:gap-y-8 rounded-xl h-[20vw]">

<div className='image_upload_div flex justify-center'>
<div  className="mainImage absolute">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY', JSON.stringify(result?.info!));
    console.table(  'this are the ' + result?.info)  
    widget.close();
  }}
  >
        {({ open }) => {
          return (
            <div ref={mainImageInputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden ">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>  
         {resource && isCloudinaryInfo(resource) && (

  <>   
 <div className="image relative">
 <div
  ref={deleteBTN}
  onClick={()=>{handleImageDelete(resource.public_id,0)}} className='cursor-pointer text-[2vw] portrait:text-[4vw] hover:text-[#a03d42] text-[#dbbcbd] px-2  py-1 hover:bg-[#d2e7e9] bg-[#a6a7ac] transition duration-300 ease-in-out rounded-full absolute m-1'>X</div>
   <Image src={`${resource.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded'/> </div></>
)}

{!resource && (
  <div
  onClick={()=>{changeImage(0)}}
     className='w-[15vw] bg-[#335241] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit w-full '/>

</div>

     </div>
)}
</div>

<div className='image_upload_div flex justify-center'>
<div  className="mainImage absolute  ">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource1(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY1', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)   

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage1InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource1 && isCloudinaryInfo(resource1) && (
          <div className='image relative'>
          <div ref={deleteBTN1} onClick={()=>{handleImageDelete(resource1.public_id,1)}} className='cursor-pointer text-[2vw] portrait:text-[4vw] hover:text-[#a03d42] text-[#dbbcbd] px-2  py-1 hover:bg-[#d2e7e9] bg-[#a6a7ac] transition duration-300 ease-in-out rounded-full absolute m-1'>X</div>
  <Image src={`${resource1.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded'/>
  </div>
)}

{!resource1 && (
    <div
    onClick={()=>{changeImage(1)}}
       className='w-[15vw] bg-[#335241] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded cursor-pointer '>
  <div className="placeholder w-full">
  <Image src={imagePlaceholder} alt='image-fill' className='object-fit w-full '/>
  
  </div>
  
       </div>
)}
</div>

<div className='image_upload_div flex justify-center'>
<div  className="mainImage absolute ">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource2(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY2', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)  

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage2InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource2 && isCloudinaryInfo(resource2) && (
          <div className='image relative'>
          <div ref={deleteBTN2} onClick={()=>{handleImageDelete(resource2.public_id,2)}} className='cursor-pointer text-[2vw] portrait:text-[4vw] hover:text-[#a03d42] text-[#dbbcbd] px-2  py-1 hover:bg-[#d2e7e9] bg-[#a6a7ac] transition duration-300 ease-in-out rounded-full absolute m-1'>X</div>
  <Image src={`${resource2.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded'/></div>
)}

{!resource2 && (
  <div
  onClick={()=>{changeImage(2)}}
     className='w-[15vw] bg-[#335241] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit w-full '/>

</div>

     </div>

)}
</div>

<div className='image_upload_div flex justify-center'>
<div  className="mainImage absolute ">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource3(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY3', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)   

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage3InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource3 && isCloudinaryInfo(resource3) && (
        <div className='image relative'>  <div ref={deleteBTN3} onClick={()=>{handleImageDelete(resource3.public_id,3)}} className='cursor-pointer text-[2vw] portrait:text-[4vw] hover:text-[#a03d42] text-[#dbbcbd] px-2  py-1 hover:bg-[#d2e7e9] bg-[#a6a7ac] transition duration-300 ease-in-out rounded-full absolute m-1'>X</div>
  <Image src={`${resource3.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded'/></div>
)}

{!resource3 && (
    <div
    onClick={()=>{changeImage(3)}}
       className='w-[15vw] bg-[#335241] portrait:w-[24vw] h-[20vw] portrait:h-[30vw] rounded cursor-pointer '>
  <div className="placeholder w-full">
  <Image src={imagePlaceholder} alt='image-fill' className='object-fit w-full '/>
  
  </div>
  
       </div>
)}
</div>



</div>

<div className="details_div flex flex-col text-[1.6vw] portrait:text-[4vw] space-y-[0.6vw] portrait:space-y-[2vw] w-[30vw] portrait:w-full portrait:sm:w-full">
<input required type="text" id="product_image_alt" name="product_image_alt" placeholder="Enter Image Alt Text" className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'/>

<select  id="productCategory" name="productCategory" className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'>
  <option value="">Add a product category</option>
  <option value="Accessories">Accessories</option>
  <option value="NewLaptops">New Laptops</option>
  <option value="UsedLaptops">Used Laptops</option>
</select>

<input required type="text" className='brandname outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md' name="brandname" placeholder='Add a Brand Name'  />
<input required type="text" className='title outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md' name="title" placeholder='Add a Title' />
<input required type="text" className='shortdescription outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md' name="shortdescription" placeholder='Add a Short Description' />
<textarea required  className='fulldescription outline-none h-[12vw] resize-none portrait:h-[24vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  name="fulldescription" placeholder='Add a full Description' />
<input required type="number" className='price [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md' name="price" placeholder='Add a Price' />

</div>



<button type="submit" className='mt-[3vw] portrait:mt-[10vw] portrait:sm:mt-[8vw] px-[2vw] py-4 w-full bg-[#20382a] hover:bg-[#172c20] transition duration-300 ease-in-out text-[#e3f5ea] hover:text-[#d0f7df] text-[1.6vw] portrait:text-[5.8vw]  rounded-md'>Post Product</button>





</form>




<div className="diplay_added_products">

<div className="w-full pb-[4vw]">

<div className="heading text-[#20382a] text-[3vw] portrait:text-[7vw] portrait:sm:text-[7.2vw] mb-[8vw]  portrait:mb-[20vw] text-center">All Products</div>




   <div className="w-full grid  portrait:grid-cols-2 landscape:grid-cols-4  gap-5   gap-y-20">




       {allProducts.map((product:any,index:number) => (
             <div
               key={product._id}
               id={product._id}
               className="laptopProduct  hover:border-x-2 
               landscape:hover:border-[#bad8d863] duration-[0.2s]  ease-in-out w-auto flex flex-col items-center text-start  space-y-1"
             >
                <div className="flex flex-col items-start">
               <TransitionLink  href={`admin/product/${product._id}`}>
                 <div className="laptopImage cursor-pointer w-[12vw] portrait:w-[26vw] portrait:sm:w-[23vw] object-contain">
                   <Image alt='' src={`${product.productMainImage}`} className="rounded-lg " width={960} height={1280} />
                 </div>
               </TransitionLink>
               <TransitionLink href={`/product/${product._id}`}>
                 <div className="laptopTitle w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.5vw] portrait:text-[5vw] text-nowrap portrait:text-wrap"><div >{product.brandName}<span className="ml-1 text-[#4b6363] text-wrap">{product.title}</span></div></div>
               </TransitionLink>
               <div className="laptopDescription w-[12vw] portrait:w-[26vw]  cursor-pointer text-[1.19vw]  portrait:text-[4vw] portrait:sm:text-[3vw]">{product.shortDescription}</div>
               <div className="laptopPrice w-[12vw] portrait:w-[26vw]  cursor-pointer font-medium text-green-900 portrait:text-[4vw]">{product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
             </div>
             </div>
           ))}
         </div>
         </div>
</div>

</>
 



</div>




  )
}


