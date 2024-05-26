
import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  await dbConnect();

  let storedData: any = [];

  try {
    const products = await Product.find({});

    storedData = products;

    console.log(storedData)

  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    return new Response('Error fetching data.',  { status: 500 });
  }

  return new Response(JSON.stringify(storedData), { status: 200 });
}


