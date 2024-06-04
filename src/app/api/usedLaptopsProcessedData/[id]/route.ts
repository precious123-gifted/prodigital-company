import dbConnect from "@/lib/dbConnect";
import { usedLaptops} from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface ID{
id:string
}

export async function GET(request: NextRequest,{params}:{params:ID}) {
  
  
    if (!params.id) {
      return new Response('Missing product ID.', { status: 400 });
    }
  
    try {
      await dbConnect();
  
      const UsedLaptops = await usedLaptops.findById(params.id);
     


     
      if (!UsedLaptops) {
        return new Response('Product not found.', { status: 404 });
      }
  
      return NextResponse.json(UsedLaptops);
      
    } catch (error) {
      console.error('Error retrieving product:', error);
      return new Response('Error fetching product.', { status: 500 });
    }
  }