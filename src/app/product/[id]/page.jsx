import SingleProductContainer from "./SingleProductContainer";

const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:${process.env.PORT}`
    : "https://cheo-hair-precious123gifteds-projects.vercel.app/";
  const url = `${baseUrl}/api/processedData`;
  
  

export async function generateStaticParams() {
 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching processed data: ${response.statusText}`);
    }

    const productsData = await response.json();
    

    return productsData.map((data) => ({
      id: data.id?.toString(), 
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
  
    return []; 
  }
}


async function getProduct(id) { 
  const url = `${baseUrl}/api/processedData`; 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching product ${id}: ${response.statusText}`);
    }

    const productsData = await response.json(); 

   
    const product = productsData.find(product => product._id === id);

   
    if (product) {
      return product;
    } else {
      console.warn(`Product with ID ${id} not found.`);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; 
  }
}


export default async function ProductInfoPage({params}) {

const product = await getProduct(params.id)

console.log(`this is the params id ${params.id} and ${product}`)

  return (
    <div>
   
   <SingleProductContainer productData={product}/>
    
  </div>
  )
}
