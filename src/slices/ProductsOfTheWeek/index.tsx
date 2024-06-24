
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Productsoftheweek from './Productoftheweek';
import dbConnect from "@/lib/dbConnect";
import { revalidatePath, revalidateTag } from "next/cache";
import useSWR from "swr";




/**
 * Props for `ProductsOfTheWeek`.
 */
export type ProductsOfTheWeekProps =
  SliceComponentProps<Content.ProductsOfTheWeekSlice>;

/**
 * Component for "ProductsOfTheWeek" Slices.
 */
const ProductsOfTheWeek = async({ slice }: ProductsOfTheWeekProps) => {


  
  const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:${process.env.PORT}`
    : "https://prodigital-company.vercel.app";

     

  
  async function getProductsOfTheWeekData() {
    await dbConnect();

    try {
      await dbConnect()
  const ProductsURL = `${baseUrl}/api/productsProcessedData`;

  const cacheBuster = new Date().getTime();
  const urlWithCacheBuster = `${ProductsURL}?cacheBuster=${cacheBuster}`;

  const response = await fetch(urlWithCacheBuster, {
    method: 'GET', // Use GET for revalidation
    headers: {
      'Cache-Control': 'no-cache' // Can be helpful for browser caching
    }
  });
  
      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return null;
      }
  
   
  
    const products = await response.json();
    console.log('Data successfully received in frontend!');
    if (products) {

      return products;
    } else {
      console.warn(`${products} not found.`);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; 
  }

  
  };
  
  if (!baseUrl) return null;
  
  
  








 
  const productsOfTheWeek = await getProductsOfTheWeekData();
  






  return (
    <>
     
<Productsoftheweek ProductsoftheweekData={productsOfTheWeek} />
 
</>
  );
};

export default ProductsOfTheWeek;
export const revalidate = 1
export const dynamic = 'force-dynamic';
