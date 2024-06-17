
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { allProducts } from "@/lib/models/Product";





export async function GET(request: NextRequest) {
  let filteredData: any[];

  try {
    await dbConnect();

    const filter = { 'category': 'NewLaptops' };

    const AllProducts = await allProducts.find(filter);

    filteredData = AllProducts; 

  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    return new Response('Error fetching data.', { status: 500 });
  }

  return new Response(JSON.stringify(filteredData), { status: 200 });
}









