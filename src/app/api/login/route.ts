
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

    // Find existing user by username
    const existingUser = await user.findOne({ userName });

    if (!existingUser) {
      // Create new user if not found
      const newUser = new user({ userName, password: hashedPassword });
      await newUser.save();

      console.log('New user created:', newUser.username);
      return new Response(JSON.stringify({
        message: 'User created successfully (new user)',
        status: 201
      }), { status: 201 });

    } else {
      // Existing user found, compare username and password hash
      if (existingUser.userName === userName && await bcrypt.compare(password, existingUser.password)) {
        // Login successful - username and password match
        console.log('Login successful for user:', existingUser.username);
        // You might want to generate a session or token here for authentication
        return new Response(JSON.stringify({
          message: 'Login successful',
          status: 200
        }), { status: 200 });
      } else {
        // Invalid username or password
        return new Response(JSON.stringify({
          message: 'Invalid username or password',
          status: 401 // Unauthorized
        }), { status: 401 });
      }
    }
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({
      message: 'Error logging in',
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




