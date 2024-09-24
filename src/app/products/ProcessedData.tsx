
import ProductsPageContent from "./ProductsPageContent";
import LoadingScreen from "./loading";
 import dbConnect from "@/lib/dbConnect";
 import { Suspense } from "react";

const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app";







  async function getProducts() { 
    await dbConnect()
   
  

    try {
      await dbConnect()
      const url = `${baseUrl}/api/productsProcessedData`;

      const response = await fetch(url, { next: { revalidate: 1 } });
  
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
  
      const productsData = await response.json(); 
  
     
  
     
      if (productsData) {
        return productsData;
      } else {
        console.warn(`category with name ${productsData} not found.`);
        return null; 
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      return null; 
    }
  }

  export default async function ProductsPage() {

    const products = await getProducts()
    
    
      return (
       
        <Suspense fallback={<LoadingScreen/>}>
       <ProductsPageContent products={products}/>
       </Suspense>
      
      )
    }
  
export const revalidate = 1

