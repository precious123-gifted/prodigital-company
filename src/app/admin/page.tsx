
import React, { useEffect, useState } from 'react';
import Bounded from '../components/Bounded';
import dbConnect from "@/lib/dbConnect";
import AdminClientPage from './client';
import { cookies } from 'next/headers';
import LoginForm from './loginForm';



export default async function AdminPage() {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigital-company.vercel.app";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
  



     const cookieStore = cookies()
     const adminSessionID = cookieStore.has('admin_session_id')

 
     console.log('from admin page adminsessionID is : '+adminSessionID)
    
      async function getProducts() { 
        await dbConnect()
       
      
    
        try {
          await dbConnect()
          const url = `https://prodigital-company.vercel.app/api/productsProcessedData`;
    
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
      
      if(!baseUrl)return null
      
      const allProducts = await getProducts()
      

      
     
      
      

        


  return (
   <Bounded>
{adminSessionID?
(<AdminClientPage allProducts={allProducts} />):(<LoginForm/>) }


   </Bounded>
  )
}

// export const revalidate = 1

