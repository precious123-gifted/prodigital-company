

import SingleProductContainer from "./SingleProductContainer";
import dbConnect from "@/lib/dbConnect";

const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app";
  
  

export async function generateStaticParams() {
 

  try {
    await dbConnect()
  const url = `${baseUrl}/api/productsProcessedData`;

    const response = await fetch(url,{ next: { revalidate: 1 } });

    if (!response.ok) {
      throw new Error(`Error fetching processed data: ${response.statusText}`);
    }

    const productsData = await response.json();
    

    return productsData.map((data) => ({
      id: data.id?.toString(), 
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
  
    return []; 
  }
}


async function getProduct(id) { 
  await dbConnect()
  try {
  await dbConnect()
  const url = `https://prodigital-company.vercel.app/api/productsProcessedData`;

    const response = await fetch(url,{ next: { revalidate: 1 } });

    if (!response.ok) {
      throw new Error(`Error fetching product ${id}: ${response.statusText}`);
    }

    const productsData = await response.json(); 

   
    const product = productsData.find(product => product._id === id);

   
    if (product) {
      return product;
    } else {
      console.warn(`Product with ID ${id} not found.`);
      return product; 
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return error; 
  }
}


export default async function ProductInfoPage({params}) {
  

const product = await getProduct(params.id)


  return (
    <div>
   
  <SingleProductContainer singleProduct={product}/>
   
  </div>
  )
}

export const revalidate = 1