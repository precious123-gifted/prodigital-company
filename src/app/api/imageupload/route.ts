import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { writeFile } from 'fs/promises'
import { image } from "@/lib/models/Product";




export async function GET(request: NextRequest) {
    let storedData: any;
  
    try {
      await dbConnect();
  
      // Sort products by _id in descending order (newest to oldest)
      const AllProducts = await image.find({}, null, { sort: { _id: -1 } });
  
      storedData = AllProducts;
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
      return new Response('Error fetching data.', { status: 500 });
    }
  
    return new Response(JSON.stringify(storedData), { status: 200 });
  }
  


// export async function POST(request: NextRequest) {
//     const data = await request.formData()
//     const file: File | null = data.get('file') as unknown as File
  
// await dbConnect()

//     if (!file) {
//     return new Response(' unsuccessfull.', { status: 201 });
//   }
  
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)
  
//     // With the file data in the buffer, you can do whatever you want with it.
//     // For this, we'll just write it to the filesystem in a new location
//     const path = `/tmp/${file.name}`
//     await writeFile(path, buffer)
//     console.log(`open ${path} to see the uploaded file`)
  
//     return new Response('Data received and saved successfully.', { status: 201 });
//   }
  
export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
  
    await dbConnect(); // Ensure database connection
  
    if (!file) {
      return new Response('No file uploaded.', { status: 400 });
    }
  
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Don't write to the filesystem (optional, adjust based on needs)
    const path = `C:\\Users\\Admin\\Documents\\${file.name}`;
    try {
      await writeFile(path, buffer);
      console.log(`open ${path} to see the uploaded file`);
    } catch (error) {
      console.error('Error writing file:', error);
      return new Response('Error saving file.', { status: 500 });
    }
  
    // Prepare data for database insertion
    const productData = {
      // Add other product properties here (e.g., name, description)
      image: buffer, // Assuming you want to store the file data directly
    };
  
    try {
      const newProduct = await image.create(productData);
      console.log('Product saved successfully:', newProduct._id); // Assuming _id is the product ID
      return new Response('Data received and saved successfully.', { status: 201 });
    } catch (error) {
      console.error('Error saving product to database:', error);
      return new Response('Error saving data.', { status: 500 });
    }
  }
  



// export async function POST(request: NextRequest) {
//     const data = await request.formData();
//     const file: File | null = data.get('file') as unknown as File;
  
//     await dbConnect();
  
//     if (!file) {
//       return new Response('No file uploaded.', { status: 400 }); // Inform user about missing file (consider a different status code if needed)
//     }
  
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
  
//     // Write the file to the filesystem
//     const path = `C:\\Users\\Admin\\Documents\\${file.name}`;
//     try {
//       await writeFile(path, buffer);
//       console.log(`open ${path} to see the uploaded file`);
//     } catch (error) {
//       console.error('Error writing file:', error);
//       return new Response('Error saving file.', { status: 500 }); // Inform user about error
//     }
  
//     return new Response('Data received and saved successfully.', { status: 201 });
//   }
  


// export async function GET(request: NextRequest) {
//     const url = new URL(request.url); // Create a URL object from the request URL
//   const searchParams = url.searchParams; // Get the search parameters

//   const productId = searchParams.get('productId');
//     if (!productId) {
//       return new Response('Missing product ID.', { status: 400 });
//     }
//     if (!productId) {
//       return new Response('Missing product ID.', { status: 400 });
//     }
  
//     await dbConnect();
  
//     try {
//       const product = await image.findById(productId); // Replace with your retrieval method
  
//       if (!product) {
//         return new Response('Product not found.', { status: 404 });
//       }
  
//       const imageData = product.image; // Assuming image is stored in the image field
  
//       if (!imageData) {
//         return new Response('Product has no image.', { status: 200 }); // Or handle differently
//       }
  
//       const contentType = 'image/jpeg'; // Adjust based on actual image type
//       const response = new Response(imageData, { status: 200 });
//       response.headers.set('Content-Type', contentType);
//       return response;
//     } catch (error) {
//       console.error('Error retrieving product image:', error);
//       return new Response('Error fetching image.', { status: 500 });
//     }
//   }
  