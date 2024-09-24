
import { NextRequest } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import { user } from "@/lib/models/Product";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";







async function getRequestBody(request: NextRequest) {
  const requestClone = request.clone();
  const body = await requestClone.json();

  return body ;
}


function generateRandomSessionId(length = 10) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZprodigital';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;  

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
    const userDataBaseLength  = await user.countDocuments();
    const existingUserProfile = await user.findOne({ userName });

    if (userDataBaseLength  === 0) {
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
      if (existingUserProfile && await bcrypt.compare(password, existingUserProfile.password)) {
        // Login successful - username and password match
        console.log('Login successful for user:', existingUserProfile.userName);
        // You might want to generate a session or token here for authentication
        const sessionId = generateRandomSessionId(); // Generate a secure, random session ID

        // Set the session cookie
        cookies().set('admin_session_id', `${sessionId}`, {
          maxAge: 60 * 60 * 9 , // Expires in 24 hours
          httpOnly: true, // Secure flag for production
          secure: process.env.NODE_ENV === 'production', // Secure flag for production
        });
        console.table('sessionID from login route : '+sessionId)
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







 



