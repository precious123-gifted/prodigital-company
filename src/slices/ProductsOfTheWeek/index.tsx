
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
  const ProductsURL = `${baseUrl}/api/productsProcessedData`;

     

  
  const getProductsOfTheWeekData = async () => {
    await dbConnect();
    const response = await fetch(`${ProductsURL}`,{ cache: 'no-store' });
  
    if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
      return null;
    }
  
    const products = await response.json();
    console.log('Data successfully received in frontend!');
  
    return products;
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
