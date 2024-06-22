
// import ProductsPageContent from "./ProductsPageContent";
// import dbConnect from "@/lib/dbConnect";




// export default async function ProductsData({settings}: any) {



//   // const allProductsProccessedData = settings.data.products.map((item :any ) => {
//   //   return {
//   //     product: item,  
//   //   };
//   // });


//   const isDevelopment = process.env.NODE_ENV === 'development' ;
//   const baseUrl = isDevelopment
//     ? `http://localhost:${process.env.PORT}`
//     : "https://prodigital-company.vercel.app";
//    const allProductsUrl = `${baseUrl}/api/productsProcessedData`;






//   // const sendAllProductData = async () => {
//   //       console.log(`this is the processed data ${allProductsProccessedData}`)
        
//   //           try {
//   //     await dbConnect()

//   //             const response = await fetch(allProductsUrl, {
//   //               method: 'POST',
//   //               headers: { 'Content-Type': 'application/json',

//   //                },
//   //               body: JSON.stringify(allProductsProccessedData),
                
//   //             });
          
        
//   //             // Handle successful response (optional):
//   //             if (response.ok) {
//   //               // Process successful response data here
//   //               const data = await response.json();
//   //               console.log('Data sent successfully:', data);
//   //               // Perform actions based on successful response
//   //             } else {
//   //               // Handle non-2xx HTTP status codes (e.g., 400, 500)
//   //               console.error('Server responded with error:', response.status, response.statusText);
//   //             }
//   //           } catch (error) {
//   //             // Handle network errors, parsing errors, or other exceptions
//   //             console.error('Error sending data:', error);
//   //             // Optionally, log more detailed error information (e.g., using a logging library)
//   //           } finally {
//   //             // Optional cleanup logic that executes regardless of success or failure
//   //             // (e.g., closing connections, releasing resources)
//   //           }
//   //         };


//   // sendAllProductData()




    
//   const getAllProductsData = async () =>{
//     await dbConnect()
//   const url = `https://prodigital-company.vercel.app/api/productsProcessedData`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Error fetching products : ${response.statusText}`);
//     }

//     const productData = await response.json(); 

   

   
//     if (productData) {
//       return productData;
//     } else {
//       console.warn(`category with name ${productData} not found.`);
//       return null; 
//     }
//   } catch (error) {
//     console.error('Error fetching category:', error);
//     return null; 
//   }
  
//   // if(!baseUrl)return null
  
//   const allProducts = await getAllProductsData()






//   return (
      
//    <ProductsPageContent 
//    allProducts={allProducts}
//    />
      
//   )
// }


 import ProductsPageContent from "./ProductsPageContent";
 import dbConnect from "@/lib/dbConnect";
import Link from "next/link";
import CategoryDataPage from "./[category]/CategoryData";

const isDevelopment = process.env.NODE_ENV === 'development' ;
const baseUrl = isDevelopment
  ? `http://localhost:${process.env.PORT}`
  : "https://prodigital-company.vercel.app";







 async function getProducts() { 
    await dbConnect()
    // const categoryString = `${category}`;
  const url = `https://prodigital-company.vercel.app/api/productsProcessedData`;
  // console.log(`this is the category from function getproduct: ${categoryString}`)
  console.log(`this is the url ${url}`)
  

    try {
      const response = await fetch(url,{cache:"no-cache"});
  
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
  
