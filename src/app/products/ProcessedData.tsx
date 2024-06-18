


import ProductsPageContent from "./ProductsPageContent";
import dbConnect from "@/lib/dbConnect";




export default async function ProductsData({settings}: any) {



  const allProductsProccessedData = settings.data.products.map((item :any ) => {
    return {
      product: item,  
    };
  });

let sentProductArray: any[] = []


  const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:${process.env.PORT}`
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






  return (
      
   <ProductsPageContent allProducts={allProducts}/>
      
  )
}
