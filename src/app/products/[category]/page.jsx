import dbConnect from "@/lib/dbConnect";
import CategoryDataPage from "./CategoryData";
import Link from "next/link";

const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app/";




export async function generateStaticParams(category) {
  await dbConnect()

  const categoryString = `${category}`;
  const url = `${baseUrl}/api/productsProcessedData`;
  console.log(`this is the category: ${categoryString}`)
  console.log(`this is the url: ${url}`)

 
   try {
     const response = await fetch(url);
 
     if (!response.ok) {
       throw new Error(`Error fetching processed data: ${response.statusText}`);
     }
 
     const productsData = await response.json();
     
 
     return productsData
   } catch (error) {
     console.error('Error generating static params:', error);
   
     return []; 
   }
 }



 async function getProducts(category) { 
    await dbConnect()
    const categoryString = `${category}`;
  const url = `${baseUrl}/api/${categoryString}ProcessedData`;
  console.log(`this is the category: ${categoryString}`)
  console.log(`this is the url ${url}`)
  

    try {
      const response = await fetch(url);
  
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
    
    console.log(`this is the category name ${params.category} and category products : ${products}`)
    
      return (
        <div>
     
       <CategoryDataPage products={products}/>
        
      </div>
      )
    }
  