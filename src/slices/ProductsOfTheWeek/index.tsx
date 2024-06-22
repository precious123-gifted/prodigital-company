
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
    const response = await fetch(`${ProductsURL}?sort=-createdAt&limit=8`,{ next: { revalidate: 1 } }); // Use URL parameters
  
    if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
      return null; // Return null in case of error
    }
  
    const products = await response.json();
    console.log('Data successfully received in frontend!');
  
    return products;
  };
  
  if (!baseUrl) return null;
  
  const productsOfTheWeek = await getProductsOfTheWeekData();
  
  // Use productsOfTheWeek for further processing or rendering
  








 
  






  return (
    <>
<Productsoftheweek ProductsoftheweekData={productsOfTheWeek} />
</>
  );
};

export default ProductsOfTheWeek;
