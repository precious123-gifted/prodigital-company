
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { user } from "@/lib/models/Product";
import bcrypt from 'bcrypt';













async function getRequestBody(request: NextRequest) {
  const requestClone = request.clone();
  const body = await requestClone.json();

  return body ;
}


export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { userName, password } = await getRequestBody(request);

    if (!userName || !password) {
      return new Response('Missing username or password.', { status: 400 });
    }

  
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

  
    const existingUser = await user.findOne({ userName }); 

    if (!existingUser) {
    
      const newUser = new user({ userName, password: hashedPassword });
      await newUser.save();

      console.log('New user created:', newUser.username);
       return new Response(JSON.stringify({
        message: 'user created successfully (existing user)',
        status: 201
       }), { status: 201 });
    } else {
       return new Response(JSON.stringify({
         message: 'please input the correct username and password',
         status: 409
         }), { status: 409 });
    }
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({
    message: 'error logging in',
    status: 500
     }), { status: 500 });
  }
}






export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const processedData = await getRequestBody(request);

    if (!processedData) {
      return new Response('Missing product data in request body.', { status: 400 });
    }



  } catch (error) {
    console.error('Error processing PUT request:', error);
    return new Response('Error receiving or updating data.', { status: 500 });
  }
}




