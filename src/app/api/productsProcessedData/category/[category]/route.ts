import dbConnect from "@/lib/dbConnect";
import { allProducts } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface Category{
category:string
}

export async function GET(request: NextRequest,{params}:{params:Category}) {
  
  
    if (!params.category) {
      return new Response('Missing product category.', { status: 400 });
    }
  
    try {
      await dbConnect();
  
      const AllProducts = await allProducts.find({ category: params.category })
     


     
      if (!AllProducts) {
        return new Response('Product not found.', { status: 404 });
      }
  
      return NextResponse.json(AllProducts);
      
    } catch (error) {
      console.error('Error retrieving product:', error);
      return new Response('Error fetching product.', { status: 500 });
    }
  }