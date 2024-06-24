

 import ProductsPageContent from "./ProductsPageContent";
 import dbConnect from "@/lib/dbConnect";
 import { revalidateTag } from "next/cache";
import Link from "next/link";
import CategoryDataPage from "./[category]/CategoryData";

const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app";







 async function getProducts() { 
    await dbConnect()
   
  

    try {
      await dbConnect()
      const url = `https://prodigital-company.vercel.app/api/productsProcessedData`;

      const response = await fetch(url, { next: { revalidate: 1 } });
      // revalidateTag(url);
  
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
    
    console.log(`this are the products: ${products}`)
    
      return (
       
     
       <ProductsPageContent products={products}/>
        
      
      )
    }
  
