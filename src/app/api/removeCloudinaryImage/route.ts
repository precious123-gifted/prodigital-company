import { CloudinaryUploadWidgetOptions } from "next-cloudinary";
import{v2 as cloudinary} from "cloudinary"
import { NextRequest } from "next/server";
require('dotenv').config();






async function getRequestBody(request: NextRequest) {
    const requestClone = request.clone();
    const body = await requestClone.json();
  
    return body ;
  }
  
  
  
  
  
  
  export async function POST(request: NextRequest) {
  
    try {
      const {public_id} = await getRequestBody(request);
  
      await cloudinary.uploader.destroy(public_id, { invalidate: true }).then(result=>console.log(result));
  
      return new Response('File deleted successfully.', { status: 201 });
    } catch (error) {
      console.error('Error deleting file:', error);
      return new Response('Error deleting file.', { status: 500 });
    }
  }

