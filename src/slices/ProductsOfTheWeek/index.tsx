
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Productsoftheweek from "./Productoftheweek";



/**
 * Props for `ProductsOfTheWeek`.
 */
export type ProductsOfTheWeekProps =
  SliceComponentProps<Content.ProductsOfTheWeekSlice>;

/**
 * Component for "ProductsOfTheWeek" Slices.
 */
const ProductsOfTheWeek = async({ slice }: ProductsOfTheWeekProps) => {


  
  const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:${process.env.PORT}`
    : "https://prodigital-company-precious123gifteds-projects.vercel.app/";
  const allProductsUrl = `${baseUrl}/api/productsProcessedData`;

     

  // const getAllProductOfTheWeekData = async () =>{

  //   const response = await fetch(allProductsUrl);
  
  //   if (!response.ok) {
  //       console.error('Error fetching data:', response.statusText);
      
  //     } else {
  //       console.log('Data successfully recieved in frontend!');
  //     }
  
  //     return response.json()
  
  // }
 
const getAllProductOfTheWeekData = async () => {
  const response = await fetch(allProductsUrl);

  if (!response.ok) {
    console.error('Error fetching data:', response.statusText);
    return []; // Return empty array on error
  }

  const allProducts = await response.json();

  // Filter products based on matching main image IDs
  const filteredProducts = allProducts.filter((product:any) => {
    // Check if product has main image and loop through slice products
    return product.product.mainimage && slice.primary.products.some((sliceProduct) => {
      return product.product.mainimage.id === sliceProduct.mainproductimage.id;
    });
  });

  console.log('Data successfully recieved in frontend!');
  return filteredProducts;
};
  

  if(!baseUrl)return null
  
  const productsOftheWeek = await getAllProductOfTheWeekData()








 
  






  return (
    <>
<Productsoftheweek ProductsoftheweekData={productsOftheWeek} slice= { slice }/>
</>
  );
};

export default ProductsOfTheWeek;
