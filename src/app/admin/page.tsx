

import React, { useEffect, useState } from 'react';
import Bounded from '../components/Bounded';
import dbConnect from "@/lib/dbConnect";
import AdminClientPage from './client';
import { allProducts } from '../../lib/models/Product';


export default async function AdminPage() {


    const isDevelopment = process.env.NODE_ENV === 'development' ;
    const baseUrl = isDevelopment
      ? `http://localhost:3000`
      : "https://prodigital-company.vercel.app";
     const allProductsUrl = `${baseUrl}/api/productsProcessedData`;
  




      const getAllProductsData = async () =>{
        await dbConnect()
        
        
        const response = await fetch(allProductsUrl,{cache: 'no-store'});
        
        
       
      
        if (!response.ok) {
            console.error('Error fetching data:', response.statusText);
          
          } else {
            console.log('Data successfully recieved in frontend!');
          }
      
          return response.json()
      
      }
      
      if(!baseUrl)return null
      
      const allProducts = await getAllProductsData()
      
      console.table(allProducts)


      
      

        


  return (
   <Bounded>

<AdminClientPage allProducts={allProducts}/>


   </Bounded>
  )
}
