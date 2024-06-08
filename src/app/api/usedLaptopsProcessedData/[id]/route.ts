import dbConnect from "@/lib/dbConnect";
import { allProducts} from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

interface ID{
id:string
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id) {
    return new Response('Missing product ID.', { status: 400 });
  }

  try {
    await dbConnect();

    // Filter by ID and category (newLaptops)
    const filter = { _id: params.id, 'product.categories': 'usedLaptops' };

    const Product = await allProducts.findOne(filter);

    if (!Product) {
      return new Response('Product not found.', { status: 404 });
    }

    return NextResponse.json(Product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    return new Response('Error fetching product.', { status: 500 });
  }
}