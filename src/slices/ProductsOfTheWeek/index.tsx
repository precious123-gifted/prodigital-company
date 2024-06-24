
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Productsoftheweek from './Productoftheweek';
import dbConnect from "@/lib/dbConnect";




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
    : "https://prodigital-company.vercel.app";

     

  
  const getProductsOfTheWeekData = async () => {
    await dbConnect();

    try {
      await dbConnect()
  const ProductsURL = `${baseUrl}/api/productsProcessedData`;

      const response = await fetch(`${ProductsURL}`,{ next: { revalidate: 1 } });
  
      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return null;
      }
  
   
  
    const products = await response.json();
    console.log('Data successfully received in frontend!');
    if (products) {
      return products;
    } else {
      console.warn(`${products} not found.`);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; 
  }

  
  };
  
  if (!baseUrl) return null;
  
  const productsOfTheWeek = await getProductsOfTheWeekData();
  
  








 
  






  return (
    <>
     
<Productsoftheweek ProductsoftheweekData={productsOfTheWeek} />
 
</>
  );
};

export default ProductsOfTheWeek;
