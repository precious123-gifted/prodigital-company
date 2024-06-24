

import React, { useEffect, useState } from 'react';
import Bounded from '../components/Bounded';
import dbConnect from "@/lib/dbConnect";
import AdminClientPage from './client';
import { allProducts } from '../../lib/models/Product';
import { revalidateTag } from 'next/cache';


export default async function AdminPage() {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigital-company.vercel.app";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
  




      // const getAllProductsData = async () =>{
      //   await dbConnect()
        
        
      //   const response = await fetch(allProductsUrl,{ next: { revalidate: 1 } });
        
        
       
      
      //   if (!response.ok) {
      //       console.error('Error fetching data:', response.statusText);
          
      //     } else {
      //       console.log('Data successfully recieved in frontend!');
      //     }
      
      //     return response.json()
      
      // }
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
      
      if(!baseUrl)return null
      
      const allProducts = await getProducts()
      
      console.table(allProducts)

      
     
      
      

        


  return (
   <Bounded>

<AdminClientPage allProducts={allProducts} />


   </Bounded>
  )
}
