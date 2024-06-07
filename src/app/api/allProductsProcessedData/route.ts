
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { accessories } from "@/lib/models/Product";
import { usedLaptops } from "@/lib/models/Product";
import { newLaptops } from "@/lib/models/Product";
import { allProducts } from "@/lib/models/Product";



// export async function GET(request: NextRequest) {
//   await dbConnect();

//   let allData: any ;

//   try { 
//     await dbConnect();
//     const Accessories = await accessories.find({});
//     const NewLaptops = await newLaptops.find({});
//     const UsedLaptops = await usedLaptops.find({});
    



//     allData = [...Accessories,...NewLaptops,...UsedLaptops,];

    

//   } catch (error) {
//     console.error('Error retrieving data from MongoDB:', error);
//     return new Response('Error fetching data.', { status: 500 });
//   }

//   return new Response(JSON.stringify(allData), { status: 200 });
// }



export async function GET(request: NextRequest) {

  let storedData: any ;

  try { 
    await dbConnect();
    const AllProducts = await allProducts.find({});


    storedData = AllProducts;

    

  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    return new Response('Error fetching data.', { status: 500 });
  }

  return new Response(JSON.stringify(storedData), { status: 200 });
}


async function getRequestBody(request: NextRequest) {
  const requestClone = request.clone();
  const body = await requestClone.json();

  return body ;
}


export async function POST(request: NextRequest) {
  try {
    const processedData = await getRequestBody(request);


    if (!Array.isArray(processedData)) {
      return new Response('Invalid data format. Please provide an array of objects.', { status: 400 });
    }

    for (const item of processedData) {

      

      const imageId = item.product.mainimage.id;

      const query = { "product.mainimage.id": imageId };

      try {
        const existingItem = await allProducts.findOne(query);

        if (existingItem) {
          return new Response(`Duplicate item detected for image ID: ${imageId}`, { status: 409 });
        }

        const newItem = new allProducts(item);
        await newItem.save();
        console.log('Product saved successfully:', item.id);
      } catch (error) {
        console.error('Error saving product:', item.id, error);
        return new Response('Error saving product.', { status: 500 });
      }
    }

    return new Response('Data received and saved successfully.', { status: 201 });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response('Error receiving or saving data.', { status: 500 });
  }
}