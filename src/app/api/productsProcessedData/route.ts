
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { allProducts } from "@/lib/models/Product";
import { writeFile } from 'fs/promises'






// export async function GET(request: NextRequest) {

//   let storedData: any ;

//   try { 
//     await dbConnect();
//     const AllProducts = await allProducts.find({});


//     storedData = AllProducts;

    

//   } catch (error) {
//     console.error('Error retrieving data from MongoDB:', error);
//     return new Response('Error fetching data.', { status: 500 });
//   }

//   return new Response(JSON.stringify(storedData), { status: 200 });
// }

export async function GET(request: NextRequest) {
  let storedData: any;

  try {
    await dbConnect();

    // Sort products by _id in descending order (newest to oldest)
    const AllProducts = await allProducts.find({}, null, { sort: { _id: -1 } });

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
await dbConnect()

  try {
    const processedData = await getRequestBody(request);
console.table(processedData)
    if (!Array.isArray(processedData)) {
      return new Response(JSON.stringify({
        message: 'Invalid data format. Please provide an array of objects.',
        status: 400
      }), { status: 400 });
    }

    // Check for empty database before iterating
    const productCount = await allProducts.countDocuments();

    if (productCount === 0) {
      console.log('Database is empty, saving new products directly.');
      for (const item of processedData) {
        const newItem = new allProducts(item);
        await newItem.save();
        console.log('Product saved successfully:', newItem.id);
      }
      
      return new Response(JSON.stringify({
        message: 'Data received and saved successfully.',
        status: 201
      }), { status: 201 });
    }


    for (const item of processedData) {
      const title = item.title; 

      const query = { title: title };

      try {
        const existingItem = await allProducts.findOne(query);

        if (existingItem) {
          // Handle potential duplicate based on price
          console.warn(`Potential duplicate product detected with price: ${title}`);
          // You can choose to return an error or adjust the new item (e.g., add a suffix)

          // Uncomment if you want to reject duplicates based on price
          return new Response(JSON.stringify({
            message: `Duplicate item detected with price: ${title}.`,
            status: 409
          }), { status: 409 });
         
        }

        const newItem = new allProducts(item);
        await newItem.save();
        console.log('Product saved successfully:', newItem.id);
      } catch (error) {
        console.error('Error saving product:', item.id, error);
        return new Response(JSON.stringify({
          message: 'Error saving product.',
          status: 500
        }), { status: 500 });
      }
    }

    return new Response('Data received and saved successfully.', { status: 201 });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({
      message: 'Error receiving or saving data.',
      status: 500
    }), { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const processedData = await getRequestBody(request);

    if (!processedData) {
      return new Response('Missing product data in request body.', { status: 400 });
    }

    const { _id, ...updateData } = processedData;

    const query = { _id }; // Use the provided _id from the form

    try {
      const updatedProduct = await allProducts.findOneAndUpdate(query, updateData, { new: true }); // Update existing document and return the updated product

      if (!updatedProduct) {
        return new Response('Product not found.', { status: 404 });
      }

      console.log('Product updated successfully:', updatedProduct);
      return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
      console.error('Error updating product:', error);
      return new Response('Error updating product.', { status: 500 });
    }
  } catch (error) {
    console.error('Error processing PUT request:', error);
    return new Response('Error receiving or updating data.', { status: 500 });
  }
}




