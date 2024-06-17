
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { allProducts } from "@/lib/models/Product";





export async function GET(request: NextRequest) {
  let filteredData: any[]; // Declare variable for filtered data

  try {
    await dbConnect();

    // Fixed filter for newLaptops category
    const filter = { 'category': 'UsedLaptops' };

    const AllProducts = await allProducts.find(filter);

    filteredData = AllProducts; // Assign filtered data to the response variable

  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    return new Response('Error fetching data.', { status: 500 });
  }

  return new Response(JSON.stringify(filteredData), { status: 200 });
}






