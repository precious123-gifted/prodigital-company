
"use client"

import Bounded from "@/app/components/Bounded";
import exitIcon from "../../../../../public/exiticon.png"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CldUploadWidget } from "next-cloudinary";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "@/StateManager";
import imagePlaceholder from "../../../../../public/image-fill.png"



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







const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:3000`
  : "https://prodigitalcompany.com.ng";
 const allProductsUrl = `/api/productsProcessedData`;




 



 


  






  const handleExitClick = () => {

    window.history.back();
  };


  const [imageData, setImageData] = useState<string | null>(productData?.productMainImage);
  const [imageData1, setImageData1] = useState<string | null>(productData?.productComplementaryImage1);
  const [imageData2, setImageData2] = useState<string | null>(productData?.productComplementaryImage2);
  const [imageData3, setImageData3] = useState<string | null>(productData?.productComplementaryImage3);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const complimentaryImage1InputRef = useRef<HTMLInputElement>(null);
  const complimentaryImage2InputRef = useRef<HTMLInputElement>(null);
  const complimentaryImage3InputRef = useRef<HTMLInputElement>(null);






  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>,number:number) => {
    console.log("Handle image called");
    const selectedFile = event.target.files?.[0];
  
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
              console.error('Invalid number passed to handleImageSelection');
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


  const changeMainImage = (number:number) => {
    

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
        console.error('Invalid number passed to handleImageSelection');
    }

  };



  const [shortDescription, setShortDescription] = useState(productData?.shortDescription || '');


  const {displayPopUp,setDisplayPopUp} = useStateContext() 
  const {popupType,setPopupType} = useStateContext() 
  const {popupMessage,setPopupMessage} = useStateContext()
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
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
  
    const updatedProduct = {
      _id: productData._id,
      imageID:resource ? (typeof resource === 'object' && isCloudinaryInfo(resource) ? resource.public_id : productData.imageID) : productData.imageID,
      image1ID:resource1 ? (typeof resource1 === 'object' && isCloudinaryInfo(resource1) ? resource1.public_id : productData.image1ID) : productData.image1ID,
      image2ID:resource2 ? (typeof resource2 === 'object' && isCloudinaryInfo(resource2) ? resource2.public_id : productData.image2ID) : productData.image2ID,
      image3ID:resource3 ? (typeof resource3 === 'object' && isCloudinaryInfo(resource3) ? resource3.public_id : productData.image3ID) : productData.image3ID,
      productMainImage: resource ? (typeof resource === 'object' && isCloudinaryInfo(resource) ? resource.url : productData.productMainImage) : productData.productMainImage,
      productComplementaryImage1: resource1 ? (typeof resource1 === 'object' && isCloudinaryInfo(resource1) ? resource1.url : productData.productComplementaryImage1) : productData.productComplementaryImage1,
      productComplementaryImage2: resource2 ? (typeof resource2 === 'object' && isCloudinaryInfo(resource2) ? resource2.url : productData.productComplementaryImage2) : productData.productComplementaryImage2,
      productComplementaryImage3: resource3 ? (typeof resource3 === 'object' && isCloudinaryInfo(resource3) ? resource3.url : productData.productComplementaryImage3) : productData.productComplementaryImage3,
      altText,
      category,
      brandName,
      title,
      shortDescription,
      fullDescription,
      price,
      postedAt: new Date().toISOString(),
    };


    try {
      const response = await fetch(allProductsUrl, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
    
   if(resource){  handleImageDelete(productData.imageID,0)  }
  if(resource1){ handleImageDelete(productData.image1ID,1)  }
  if(resource2){ handleImageDelete(productData.image2ID,2)  }
  if(resource3){ handleImageDelete(productData.image3ID,3)  }
  localStorage.removeItem("RESOURCE_ID_KEY")
  localStorage.removeItem("RESOURCE_ID_KEY1")
  localStorage.removeItem("RESOURCE_ID_KEY2")
  localStorage.removeItem("RESOURCE_ID_KEY3")
  setPopupType('success')
  setDisplayPopUp(true)
  setPopupMessage('Product Updated Successfully')
  window.history.back();

        const data = await response.json();
        console.log('Data sent successfully:', data);
      } else if (response.status === 409) {
        console.error('Server responded with conflict (409):', response.statusText);
        setPopupType('warning')
        setDisplayPopUp(true)      
        setPopupMessage('This product image already exist. Please use a different image and try again.'); 
      } else {
        console.error('Server responded with error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${allProductsUrl}/${productData._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setPopupType('success')
          setDisplayPopUp(true)        
          setPopupMessage('Product deleted Successfully')
          deleteImages()

          if(resource){  handleImageDelete(productData.imageID,0)  }
          if(resource1){ handleImageDelete(productData.image1ID,1)  }
          if(resource2){ handleImageDelete(productData.image2ID,2)  }
          if(resource3){ handleImageDelete(productData.image3ID,3)  }

          const data = await response.json();
          console.log('Product deleted successfully:', data);
          window.history.back();
        } else {
          console.error('Server responded with error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
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
        console.error('Invalid number passed to handleImageSelection');
    }
  

  }
  
  }
  
  catch (error) {
    console.error('Error deleting image:', error);
  }
  }




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


    
  return (
    <Bounded>
      
      <div className="expandedcontainer  text-[#384d4d] w-auto   flex flex-col  items-center text-center space-y-5  portrait:px-[8vw] py-[2vw] portrait:py-[8vw]">
<div className="exiticon    w-full flex justify-end ">
 
<Image onClick={handleExitClick} src={exitIcon} alt="exit-icon" className="landscape:w-[2vw] portrait:w-[6vw] portrait:sm:w-[4vw]  object-cover cursor-pointer"/>
</div>
    
<div className="content landscape:w-[55%] space-y-[2vw]">


<form 
id={productData._id}
onSubmit={handleUpdate}>

<div 
    key={productData._id}
    id={productData._id}
   className="productContainer   flex flex-col landscape:flex-row landscape:justify-between landscape:items-start items-center text-center space-x-[6vw] portrait:space-y-[3vw] ">
   <div className="imagecontainer w-[100vw] portrait:w-[80vw]">

   <div className="complimentaryimages flex justify-between w-full  mb-[1vw]    landscape:space-x-[1vw]">
   
   <>
    <div className="complementaryImage1 relative">
    <CldUploadWidget uploadPreset="x2uckqjw"

onSuccess={(result, { widget }) => {
  setResource1(result?.info!);
  localStorage.setItem('RESOURCE_ID_KEY', JSON.stringify(result?.info!));
  console.table(  'this are the ' + result?.info)  
  widget.close();
}}
>
      {({ open }) => {
        return (
          <div ref={complimentaryImage1InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


        );
      }}
    </CldUploadWidget>

    {!imageData1 && (
  <div
  onClick={()=>{changeMainImage(1)}}
     className=' bg-[#335241]   rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit landscape:w-[8.5vw] portrait:w-full'  width={960} height={1280}/>

</div>

     </div>
)}

{imageData1 &&    

<div className="complementoryImage1Div relative w-full bg-[#5f8385] rounded-lg" >

<div
    onClick={()=>{changeMainImage(1)}}
      className ="button absolute text-[8vw] portrait:text-[20vw] cursor-pointer text-[#bceff1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+
      </div>
    <Image alt='' src={resource1 && isCloudinaryInfo(resource1)?`${resource1!.url}`:`${imageData1}`} className="rounded-lg landscape:w-[8.5vw] portrait:w-[20vw] " width={960} height={1280} />

</div>

}
      </div>
      </>


      <>
    <div className="complementaryImage2 relative">
    <CldUploadWidget uploadPreset="x2uckqjw"

onSuccess={(result, { widget }) => {
  setResource2(result?.info!);
  localStorage.setItem('RESOURCE_ID_KEY', JSON.stringify(result?.info!));
  console.table(  'this are the ' + result?.info)  
  widget.close();
}}
>
      {({ open }) => {
        return (
          <div ref={complimentaryImage2InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


        );
      }}
    </CldUploadWidget>

    {!imageData2 && (
  <div
  onClick={()=>{changeMainImage(2)}}
     className=' bg-[#335241]   rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit landscape:w-[8.5vw] portrait:w-full'  width={960} height={1280}/>

</div>

     </div>
)}

{imageData2 &&    

<div className="complementaryImage2Div relative w-full bg-[#5f8385] rounded-lg" >

<div
    onClick={()=>{changeMainImage(2)}}
      className ="button absolute text-[8vw] portrait:text-[20vw] cursor-pointer text-[#bceff1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+
      </div>
    <Image alt='' src={resource2 && isCloudinaryInfo(resource2)?`${resource2!.url}`:`${imageData2}`} className="rounded-lg landscape:w-[8.5vw] portrait:w-[20vw] " width={960} height={1280} />

</div>

}
      </div>
      </>


      <>
    <div className="complimentaryImage3 relative object-contain ">
    <CldUploadWidget uploadPreset="x2uckqjw"

onSuccess={(result, { widget }) => {
  setResource3(result?.info!);
  localStorage.setItem('RESOURCE_ID_KEY', JSON.stringify(result?.info!));
  console.table(  'this are the ' + result?.info)  
  widget.close();
}}
>
      {({ open }) => {
        return (
          <div ref={complimentaryImage3InputRef} onClick={() => open()}  className="bg-grey-1 text-black cursor-pointer hidden">Upload</div>


        );
      }}
    </CldUploadWidget>

    {!imageData3 && (
  <div
  onClick={()=>{changeMainImage(3)}}
     className=' bg-[#335241]   rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit landscape:w-[8.5vw] portrait:w-full'  width={960} height={1280}/>

</div>

     </div>
)}

{imageData3 &&    

<div className="complementaryImage3Div relative w-full  bg-[#5f8385] rounded-lg" >

<div
    onClick={()=>{changeMainImage(3)}}
      className ="button absolute text-[8vw] portrait:text-[20vw] cursor-pointer text-[#bceff1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+
      </div>
    <Image alt='' src={resource3 && isCloudinaryInfo(resource3)?`${resource3!.url}`:`${imageData3}`} className="rounded-lg landscape:w-[8.5vw] portrait:w-[20vw] " width={960} height={1280} />

</div>

}
      
      </div>
      </>
        
        
        </div>





        <div  className="mainImage relative landscape:w-full portrait:w-full    object-contain">
        
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

      {!imageData && (
  <div
  onClick={()=>{changeMainImage(0)}}
     className=' bg-[#335241]   rounded cursor-pointer '>
<div className="placeholder w-full">
<Image src={imagePlaceholder} alt='image-fill' className='object-fit w-full'  width={960} height={1280}/>

</div>

     </div>
)}

{imageData &&    

<div className="mainImageDiv relative bg-[#5f8385] rounded-lg" >

<div
    onClick={()=>{changeMainImage(0)}}
      className ="button absolute text-[8vw] portrait:text-[60vw] cursor-pointer text-[#bceff1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+
      </div>
    <Image alt='' src={resource && isCloudinaryInfo(resource)?`${resource!.url}`:`${imageData}`} className="rounded-lg w-full " width={960} height={1280} />

</div>

}
        </div>

   </div>



<div className="details_div flex flex-col text-[1.6vw] portrait:text-[4vw] space-y-[0.6vw] portrait:space-y-[2vw] w-[30vw] portrait:w-full portrait:sm:w-full">
<input type="text" defaultValue={productData?.altText}  name='product_image_alt' placeholder="Enter Image Alt Text" className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'/>

<select defaultValue={productData.category} id="productCategory" name="productCategory" className='outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'>
  <option value="">Add a product category</option>
  <option value="Accessories">Accessories</option>
  <option value="NewLaptops">New Laptops</option>
  <option value="UsedLaptops">Used Laptops</option>
</select>

<input type="text" defaultValue={productData?.brandName}  name="brandname" className='brandname outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  placeholder='Add a Brand Name'  />
<input type="text" defaultValue={productData?.title} name="title" className='title outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  placeholder='Add a Title' />
<input defaultValue={shortDescription} name="shortdescription"  className='shortdescription outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'  placeholder='Add a Short Description' />
<textarea defaultValue={productData?.fullDescription} name="fulldescription" className='h-[12vw] resize-none fulldescription outline-none  portrait:h-[24vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'   placeholder='Add a full Description' />
<input defaultValue={productData?.price} type="number" name="price" className='price [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  outline-none h-[3vw] portrait:h-[10vw] px-3 text-[#20382a] bg-[#eafcf1] rounded-md'   placeholder='Add a Price' />

</div>


</div>

<div className="action_buttons text-[1.6vw] portrait:text-[4vw] mt-[4vw] portrait:mt-[12vw] portrait:sm:mt-[8vw] flex justify-between">
<div onClick={handleDeleteProduct} className="cursor-pointer px-[2vw]  portrait:px-[4vw] transition duration-300 ease-in-out   py-2 bg-[#ceafaf] text-[#833e3e]  hover:bg-[#833e3e] hover:text-[#ceafaf] rounded-sm" >Delete Product</div>
      
      <button type="submit" className="cursor-pointer px-[2vw]  portrait:px-[4vw] transition duration-300 ease-in-out  py-2 bg-[#2a693a] text-[#ceecd5]  hover:bg-[#1e4728] hover:text-[#bae0c3] rounded-sm">Update Product</button>   
      
   </div>

</form>


</div>

     
</div>

    </Bounded>
    
  )
}
