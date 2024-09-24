import dbConnect from "@/lib/dbConnect";
import CategoryDataPage from "./CategoryData";
import { Suspense } from "react";
import LoadingScreen from "./loading";


const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app";







  async function getProducts(category) { 
    await dbConnect()
    const categoryString = `${category}`;

  

    try {
      await dbConnect()
  const url = `${baseUrl}/api/productsProcessedData/category/${categoryString}`;
      const response = await fetch(url,{ next: { revalidate: 1 } });
  
      if (!response.ok) {
        throw new Error(`Error fetching product category of ${category}: ${response.statusText}`);
      }
  
      const categoryData = await response.json(); 
  
     
  
     
      if (categoryData) {
        return categoryData;
      } else {
        console.warn(`category with name ${categoryData} not found.`);
        return null; 
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      return null; 
    }
  }

  export default async function CategoryPage({params}) {

    const products = await getProducts(params.category)
    
    
      return (
        <div>
        <Suspense fallback={<LoadingScreen/>}>
     
       <CategoryDataPage products={products}/>
       </Suspense>
        
      </div>
      )
    }

    export const dynamic = 'force-dynamic';

  