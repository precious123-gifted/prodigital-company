
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
  const ProductsoftheweekUrl = `${baseUrl}/api/productsOfTheWeek`;

     

  

const getProductsOfTheWeekData = async () =>{
  await dbConnect()
  const response = await fetch(ProductsoftheweekUrl,{cache: 'no-store'});
  
 

  if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
    
    } else {
      console.log('Data successfully recieved in frontend!');
    }

    return response.json()

}

if(!baseUrl)return null

const productsOfTheWeek = await getProductsOfTheWeekData()








 
  






  return (
    <>
<Productsoftheweek ProductsoftheweekData={productsOfTheWeek} slice= { slice }/>
</>
  );
};

export default ProductsOfTheWeek;
