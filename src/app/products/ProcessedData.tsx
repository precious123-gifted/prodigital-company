


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






   const sendAllProductData = async () => {
  
    try {
      await dbConnect();
  
      // Filter new products before sending (assuming allProductsProccessedData includes product information)
      const newProductArray = allProductsProccessedData.filter((item:any) => {
  return !sentProductArray.some((existingProduct:any) => existingProduct.product.mainimage.id === item.product.mainimage.id);
});
  
      if (newProductArray.length > 0) {
        const response = await fetch(allProductsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProductArray), // Send only new products
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data sent successfully:', data);
          sentProductArray = sentProductArray.concat(newProductArray);
          // Perform actions based on successful response
        } else {
          console.error('Server responded with error:', response.status, response.statusText);
        }
      } else {
        console.log('No new products to send to database.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      // Optionally, log more detailed error information (e.g., using a logging library)
    } finally {
      // Optional cleanup logic (e.g., closing connections, releasing resources)
    }
  };
  


  sendAllProductData()




    
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
