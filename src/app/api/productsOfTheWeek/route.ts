
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { allProducts } from "@/lib/models/Product";





export async function GET(request: NextRequest) {
  let storedData: any;

  try {
    await dbConnect();

    // Limit results to 4 and sort by _id descending (newest to oldest)
    const AllProducts = await allProducts.find({}, null, {
      sort: { _id: -1 },
      limit: 8, // Limit the number of results to 4
    });

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










