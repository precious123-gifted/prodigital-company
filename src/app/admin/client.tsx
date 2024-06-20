"use client"


import React, { useEffect, useRef, useState } from 'react'
import dbConnect from "@/lib/dbConnect";
import Link from 'next/link';
import Image from 'next/image';
import { useStateContext } from "@/StateManager";
import { CldUploadWidget } from 'next-cloudinary';
import ImageUpload from './ImageUpload';
import addImagePic from "../../../public/add_image.jpg"
import addSubImagePic from "../../../public/add_sub_image.jpg"






export default function AdminClientPage({allProducts,image}:any) {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigital-company.vercel.app";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
     const loginUrl = `${baseUrl}/api/login`;
     const imageUrl = `${baseUrl}/api/imageupload`;


     const [isAuthenticated, setIsAuthenticated] = useState(true);
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










      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();



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

        console.table(product);


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
            const data = await response.json();
           
            console.log('Data sent successfully:', data);
          } else if (response.status === 409) {
            console.error('Server responded with conflict (409):', response.statusText);
            alert('This product image already exist. Please use a different title and try again.');
          } else {
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
  return typeof value === 'object' && 'public_id' in value; // Check for object with public_id
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

<div className="content">

{isAuthenticated ? (





  <>
<form
onSubmit={handleSubmit}
 className="add_product_div w-full flex-col">

<div className="image_div flex w-full">

<>
<div  className="mainImage relative landscape:w-[25vw] portrait:w-full   portrait:sm:w-[40vw] object-contain">

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
            <div ref={mainImageInputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource && isCloudinaryInfo(resource) && (

  <>        <div
  ref={deleteBTN}
  onClick={()=>{handleImageDelete(resource.public_id,0)}} className='cursor-pointer text-[4vw] text-red-600'>X</div>
 <Image src={`${resource.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] rounded'/></>
)}

{!resource && (
  <Image
  onClick={()=>{changeImage(0)}}
  src={addImagePic} alt="Product" width={960} height={1280}  className='w-[15vw] rounded cursor-pointer'/>
)}
</>

<>
<div  className="mainImage relative landscape:w-[25vw] portrait:w-full   portrait:sm:w-[40vw] object-contain">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource1(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY1', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)  // { public_id, secure_url, etc }

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage1InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource1 && isCloudinaryInfo(resource1) && (
          <>
          <div ref={deleteBTN1} onClick={()=>{handleImageDelete(resource1.public_id,1)}} className='cursor-pointer text-[4vw] text-red-600'>X</div>
  <Image src={`${resource1.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] rounded'/>
  </>
)}

{!resource1 && (
  <Image
  onClick={()=>{changeImage(1)}}
  src={addSubImagePic} alt="Product" width={960} height={1280}  className='w-[15vw] rounded cursor-pointer'/>
)}
</>

<>
<div  className="mainImage relative landscape:w-[25vw] portrait:w-full   portrait:sm:w-[40vw] object-contain">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource2(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY2', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)  // { public_id, secure_url, etc }

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage2InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource2 && isCloudinaryInfo(resource2) && (
          <>
          <div ref={deleteBTN2} onClick={()=>{handleImageDelete(resource2.public_id,2)}} className='cursor-pointer text-[4vw] text-red-600'>X</div>
  <Image src={`${resource2.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] rounded'/></>
)}

{!resource2 && (
  <Image
  onClick={()=>{changeImage(2)}}
  src={addSubImagePic} alt="Product" width={960} height={1280}  className='w-[15vw] rounded cursor-pointer'/>
)}
</>

<>
<div  className="mainImage relative landscape:w-[25vw] portrait:w-full   portrait:sm:w-[40vw] object-contain">

<CldUploadWidget uploadPreset="x2uckqjw"

  onSuccess={(result, { widget }) => {
    setResource3(result?.info!);
    localStorage.setItem('RESOURCE_ID_KEY3', JSON.stringify(result?.info!));

    console.table(  'this are the ' + result?.info!)  // { public_id, secure_url, etc }

    widget.close();
  }}>
        {({ open }) => {
          return (
            <div ref={complimentaryImage3InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


          );
        }}
      </CldUploadWidget>

        </div>   {resource3 && isCloudinaryInfo(resource3) && (
        <>  <div ref={deleteBTN3} onClick={()=>{handleImageDelete(resource3.public_id,3)}} className='cursor-pointer text-[4vw] text-red-600'>X</div>
  <Image src={`${resource3.url}`} alt="Product" width={960} height={1280}  className='w-[15vw] rounded'/></>
)}

{!resource3 && (
  <Image
  onClick={()=>{changeImage(3)}}
  src={addSubImagePic} alt="Product" width={960} height={1280}  className='w-[15vw] rounded cursor-pointer'/>
)}
</>



</div>

<div className="category_div">
<input type="text" id="product_image_alt" name="product_image_alt" placeholder="Enter Image Alt Text" />

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


<div onClick={()=>{console.table(resource)}}>show result</div>
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


