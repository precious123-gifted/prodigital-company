
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { accessories } from "@/lib/models/Product";
import { usedLaptops } from "@/lib/models/Product";
import { newLaptops } from "@/lib/models/Product";



export async function GET(request: NextRequest) {
  await dbConnect();

  let allData: any ;

  try { 
    await dbConnect();
    const Accessories = await accessories.find({});
    const NewLaptops = await newLaptops.find({});
    const UsedLaptops = await usedLaptops.find({});
    



    allData = [...NewLaptops,...UsedLaptops,...Accessories];

    

  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    return new Response('Error fetching data.', { status: 500 });
  }

  return new Response(JSON.stringify(allData), { status: 200 });
}